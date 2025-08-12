// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE FORMS MANAGEMENT FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════
// This file contains all functions for exporting, importing, comparing, and 
// updating Google Forms programmatically. Extracted from Code.js for maintainability.

// Form Export Functions
// ═══════════════════════════════════════════════════════════════════════════════

function exportFormToJSON(formId, formName) {
  try {
    const form = FormApp.openById(formId);
    const items = form.getItems();
    
    const formData = {
      metadata: {
        formId: formId,
        name: formName,
        title: form.getTitle(),
        description: form.getDescription(),
        exportTimestamp: new Date().toISOString()
      },
      items: []
    };
    
    items.forEach((item, index) => {
      const itemData = {
        index: index,
        title: item.getTitle(),
        type: item.getType().toString(),
        helpText: item.getHelpText(),
        required: false
      };
      
      // Handle different item types
      switch (item.getType()) {
        case FormApp.ItemType.TEXT:
          const textItem = item.asTextItem();
          itemData.required = textItem.isRequired();
          break;
        case FormApp.ItemType.PARAGRAPH_TEXT:
          const paragraphItem = item.asParagraphTextItem();
          itemData.required = paragraphItem.isRequired();
          break;
        case FormApp.ItemType.MULTIPLE_CHOICE:
          const mcItem = item.asMultipleChoiceItem();
          itemData.required = mcItem.isRequired();
          itemData.choices = mcItem.getChoices().map(choice => choice.getValue());
          break;
        case FormApp.ItemType.CHECKBOX:
          const checkboxItem = item.asCheckboxItem();
          itemData.required = checkboxItem.isRequired();
          itemData.choices = checkboxItem.getChoices().map(choice => choice.getValue());
          break;
        case FormApp.ItemType.LIST:
          const listItem = item.asListItem();
          itemData.required = listItem.isRequired();
          itemData.choices = listItem.getChoices().map(choice => choice.getValue());
          break;
        case FormApp.ItemType.SCALE:
          const scaleItem = item.asScaleItem();
          itemData.required = scaleItem.isRequired();
          itemData.lowerBound = scaleItem.getLowerBound();
          itemData.upperBound = scaleItem.getUpperBound();
          itemData.leftLabel = scaleItem.getLeftLabel();
          itemData.rightLabel = scaleItem.getRightLabel();
          break;
        case FormApp.ItemType.GRID:
          const gridItem = item.asGridItem();
          itemData.required = gridItem.isRequired();
          itemData.rows = gridItem.getRows();
          itemData.columns = gridItem.getColumns();
          break;
        case FormApp.ItemType.SECTION_HEADER:
          // Section headers don't have required property
          break;
        default:
          Logger.log(`Unknown item type: ${item.getType()}`);
      }
      
      formData.items.push(itemData);
    });
    
    return formData;
  } catch (error) {
    Logger.log(`Error exporting form ${formId}: ${error.message}`);
    return null;
  }
}

function updateEmbeddedFormData() {
  Logger.log('📋 Updating embedded form data...');
  
  const allFormsData = {};
  let errorCount = 0;
  
  // Export Phase 1 form
  Logger.log('📋 Exporting Phase 1...');
  const phase1Data = exportFormToJSON('1w4aPniYDM3oxiT-crPghmn9sYxYaw51sSexktoZJE8A', 'Phase 1 - Profile Classification');
  if (phase1Data) {
    allFormsData['PHASE_1'] = phase1Data;
    Logger.log(`✅ Phase 1: ${phase1Data.items.length} questions`);
  } else {
    errorCount++;
  }
  
  // Export all Phase 2 forms
  Object.entries(FORM_CONFIG).forEach(([configKey, formConfig]) => {
    if (!formConfig.formId) {
      Logger.log(`⚠️ No form ID for ${configKey}`);
      return;
    }
    
    Logger.log(`📋 Exporting ${configKey}...`);
    const formData = exportFormToJSON(formConfig.formId, formConfig.name);
    if (formData) {
      allFormsData[configKey] = formData;
      Logger.log(`✅ ${configKey}: ${formData.items.length} questions`);
    } else {
      errorCount++;
    }
  });
  
  // Save the data to a temporary file instead of logging
  const updateData = {
    lastExported: new Date().toISOString(),
    exportedBy: 'updateEmbeddedFormData()',
    formsData: allFormsData
  };
  
  // Write to a Google Drive file for easy access
  try {
    const blob = Utilities.newBlob(JSON.stringify(updateData, null, 2), 'application/json', 'current_forms_export.json');
    const file = DriveApp.createFile(blob);
    Logger.log(`📁 Form data saved to Google Drive: ${file.getName()}`);
    Logger.log(`📁 File ID: ${file.getId()}`);
  } catch (error) {
    Logger.log(`❌ Error saving to Drive: ${error.message}`);
  }
  
  if (errorCount === 0) {
    Logger.log(`✅ Successfully exported ${Object.keys(allFormsData).length} forms`);
    Logger.log(`Run showFormComparison('1_ROBS_In_Use') for detailed form view.`);
  }
  
  return {
    success: errorCount === 0,
    formsCount: Object.keys(allFormsData).length,
    errorCount: errorCount,
    data: updateData
  };
}

// Form Analysis Functions
// ═══════════════════════════════════════════════════════════════════════════════

function analyzeFormGaps() {
  if (!CURRENT_FORMS || !CURRENT_FORMS.formsData) {
    Logger.log('❌ No current forms data available. Run updateEmbeddedFormData() first.');
    return;
  }
  
  Logger.log(`\n🔍 FORM GAP ANALYSIS`);
  Logger.log(`Data from: ${CURRENT_FORMS.lastExported}`);
  
  // Check each profile's form against universal questions
  Object.entries(PROFILE_CONFIG).forEach(([profileId, profileConfig]) => {
    const currentForm = CURRENT_FORMS.formsData[profileId];
    
    if (!currentForm) {
      Logger.log(`\n❌ ${profileId}: No form data found`);
      return;
    }
    
    Logger.log(`\n📋 ${profileId}:`);
    Logger.log(`Current: ${currentForm.items.length} questions`);
    
    // Check for universal questions
    const missingUniversal = [];
    const universalQuestions = UNIVERSAL_QUESTIONS; // Assume this exists
    
    if (universalQuestions) {
      universalQuestions.forEach(q => {
        const found = currentForm.items.some(item => 
          item.title.toLowerCase().includes(q.title.toLowerCase().substring(0, 10))
        );
        if (!found) {
          missingUniversal.push(q.title);
        }
      });
    }
    
    if (missingUniversal.length > 0) {
      Logger.log(`❌ Missing universal questions (${missingUniversal.length}):`);
      missingUniversal.forEach(q => Logger.log(`   • ${q}`));
    } else {
      Logger.log(`✅ Has all universal questions`);
    }
    
    // Check profile-specific questions
    const profileConfig = PROFILE_CONFIG[profileId];
    if (profileConfig && profileConfig.specificQuestions) {
      const missingSpecific = [];
      profileConfig.specificQuestions.forEach(q => {
        const found = currentForm.items.some(item => 
          item.title.toLowerCase().includes(q.toLowerCase().substring(0, 10))
        );
        if (!found) {
          missingSpecific.push(q);
        }
      });
      
      if (missingSpecific.length > 0) {
        Logger.log(`⚠️ Missing profile-specific questions (${missingSpecific.length}):`);
        missingSpecific.forEach(q => Logger.log(`   • ${q}`));
      }
    }
  });
}

function showFormComparison(profileId) {
  if (!CURRENT_FORMS || !CURRENT_FORMS.formsData) {
    Logger.log('❌ No current forms data available. Run updateEmbeddedFormData() first.');
    return;
  }
  
  const idealTemplate = generateFormTemplate(profileId);
  
  Logger.log(`\n=== FORM COMPARISON: ${profileId} ===`);
  Logger.log(`Current vs Ideal Template\n`);
  
  const currentForm = CURRENT_FORMS.formsData[profileId];
  if (!currentForm) {
    Logger.log(`❌ No current form data for ${profileId}`);
    return;
  }
  
  Logger.log(`📋 CURRENT FORM:`);
  Logger.log(`Title: ${currentForm.metadata.title}`);
  Logger.log(`Questions: ${currentForm.items.length}`);
  Logger.log(`Last exported: ${currentForm.metadata.exportTimestamp}`);
  
  Logger.log(`\n📋 IDEAL TEMPLATE:`);
  Logger.log(`Title: ${idealTemplate.title}`);
  Logger.log(`Questions: ${idealTemplate.questions?.length || 0}`);
  
  // Show differences
  const comparison = compareFormStructures(currentForm, idealTemplate);
  if (comparison.differences.length > 0) {
    Logger.log(`\n❌ DIFFERENCES FOUND (${comparison.differences.length}):`);
    comparison.differences.forEach(diff => {
      Logger.log(`   • ${diff.type}: ${diff.description}`);
    });
  } else {
    Logger.log(`\n✅ Forms match perfectly!`);
  }
}

function exportAllFormsToJSON() {
  Logger.log('📋 Exporting all forms to JSON files...');
  
  const allFormsData = {};
  let successCount = 0;
  let errorCount = 0;
  
  // Export Phase 1
  try {
    if (!CURRENT_FORMS?.formsData?.PHASE_1?.metadata?.formId) {
      Logger.log('❌ Phase 1 form ID not found');
      return;
    }
    
    Logger.log(`Exporting PHASE_1...`);
    const formData = exportFormToJSON(CURRENT_FORMS.formsData.PHASE_1.metadata.formId, 'Phase 1');
    
    if (formData) {
      allFormsData['PHASE_1'] = formData;
      successCount++;
    } else {
      errorCount++;
    }
  } catch (error) {
    Logger.log(`❌ Error exporting PHASE_1: ${error.message}`);
    errorCount++;
  }
  
  // Export all Phase 2 forms
  Object.entries(FORM_CONFIG).forEach(([configKey, formConfig]) => {
    try {
      if (!formConfig.formId) {
        Logger.log(`⚠️ No form ID for ${configKey}`);
        return;
      }
      
      Logger.log(`Exporting ${formConfig.name}...`);
      const formData = exportFormToJSON(formConfig.formId, formConfig.name);
      
      if (formData) {
        allFormsData[configKey] = formData;
        successCount++;
      } else {
        errorCount++;
      }
    } catch (error) {
      Logger.log(`❌ Error exporting ${configKey}: ${error.message}`);
      errorCount++;
    }
  });
  
  // Create combined export data
  const exportData = {
    exportTimestamp: new Date().toISOString(),
    exportedBy: 'exportAllFormsToJSON()',
    formsCount: successCount,
    formsData: allFormsData
  };
  
  Logger.log(`\n📊 Export complete: ${successCount} forms exported, ${errorCount} errors`);
  
  return exportData;
}

function analyzeFormStructure(formKey) {
  if (!CURRENT_FORMS?.formsData?.[formKey]) {
    Logger.log(`❌ No form data found for ${formKey}`);
    return;
  }
  
  const form = CURRENT_FORMS.formsData[formKey];
  
  console.log(`\n=== ${formKey} ANALYSIS ===`);
  console.log(`Title: ${form.metadata.title}`);
  console.log(`Description: ${form.metadata.description}`);
  console.log(`Total Questions: ${form.items.length}`);
  console.log(`Export Date: ${form.metadata.exportTimestamp}`);
  
  // Analyze question types
  const questionTypes = {};
  form.items.forEach(item => {
    questionTypes[item.type] = (questionTypes[item.type] || 0) + 1;
  });
  
  console.log(`\nQuestion Type Breakdown:`);
  Object.entries(questionTypes).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
}

function compareAllFormsToTemplates() {
  Logger.log('🔍 Comparing all current forms to ideal templates...\n');
  
  Object.keys(PROFILE_CONFIG).forEach(profileId => {
    if (CURRENT_FORMS?.formsData?.[profileId]) {
      analyzeFormStructure(profileId);
    }
  });
}

// Form Update Functions
// ═══════════════════════════════════════════════════════════════════════════════

function clearFormItems(formId) {
  try {
    const form = FormApp.openById(formId);
    const items = form.getItems();
    
    // Delete all items in reverse order to avoid index shifting
    for (let i = items.length - 1; i >= 0; i--) {
      form.deleteItem(items[i]);
    }
    
    Logger.log(`Cleared ${items.length} items from form ${formId}`);
    return true;
  } catch (error) {
    Logger.log(`Error clearing form ${formId}: ${error.message}`);
    return false;
  }
}

function addQuestionToForm(form, questionDef) {
  let item = null;
  
  switch (questionDef.type) {
    case 'SECTION_HEADER':
      item = form.addSectionHeaderItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      break;
      
    case 'TEXT':
      item = form.addTextItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'PARAGRAPH_TEXT':
      item = form.addParagraphTextItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'MULTIPLE_CHOICE':
      item = form.addMultipleChoiceItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.choices && questionDef.choices.length > 0) {
        item.setChoices(questionDef.choices.map(choice => 
          item.createChoice(choice)
        ));
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'CHECKBOX':
      item = form.addCheckboxItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.choices && questionDef.choices.length > 0) {
        item.setChoices(questionDef.choices.map(choice => 
          item.createChoice(choice)
        ));
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'LIST':
      item = form.addListItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.choices && questionDef.choices.length > 0) {
        item.setChoices(questionDef.choices.map(choice => 
          item.createChoice(choice)
        ));
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'SCALE':
      item = form.addScaleItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.lowerBound !== undefined && questionDef.upperBound !== undefined) {
        item.setBounds(questionDef.lowerBound, questionDef.upperBound);
      }
      if (questionDef.leftLabel) {
        item.setLeftLabel(questionDef.leftLabel);
      }
      if (questionDef.rightLabel) {
        item.setRightLabel(questionDef.rightLabel);
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'GRID':
      item = form.addGridItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.rows && questionDef.rows.length > 0) {
        item.setRows(questionDef.rows);
      }
      if (questionDef.columns && questionDef.columns.length > 0) {
        item.setColumns(questionDef.columns);
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    default:
      Logger.log(`Unknown question type: ${questionDef.type}`);
      return null;
  }
  
  return item;
}

function updateFormStructure(formId, formStructure) {
  try {
    const form = FormApp.openById(formId);
    
    // Update form metadata
    if (formStructure.title) {
      form.setTitle(formStructure.title);
    }
    if (formStructure.description) {
      form.setDescription(formStructure.description);
    }
    
    // Clear existing items
    const clearSuccess = clearFormItems(formId);
    if (!clearSuccess) {
      return {
        success: false,
        error: "Failed to clear existing form items"
      };
    }
    
    // Add new items
    const addedItems = [];
    
    if (formStructure.questions && formStructure.questions.length > 0) {
      formStructure.questions.forEach((questionDef, index) => {
        try {
          const item = addQuestionToForm(form, questionDef);
          if (item) {
            addedItems.push({
              index: index,
              title: questionDef.title,
              type: questionDef.type,
              success: true
            });
          }
        } catch (error) {
          addedItems.push({
            index: index,
            title: questionDef.title,
            type: questionDef.type,
            success: false,
            error: error.message
          });
        }
      });
    }
    
    const successCount = addedItems.filter(item => item.success).length;
    const errorCount = addedItems.filter(item => !item.success).length;
    
    Logger.log(`Form ${formId} updated: ${successCount} items added, ${errorCount} errors`);
    
    return {
      success: errorCount === 0,
      formId: formId,
      itemsAdded: successCount,
      errors: errorCount,
      details: addedItems
    };
    
  } catch (error) {
    return {
      success: false,
      formId: formId,
      error: error.message
    };
  }
}

function batchUpdateForms(formUpdates) {
  Logger.log(`🔄 Batch updating ${formUpdates.length} forms...`);
  
  const results = formUpdates.map(update => {
    Logger.log(`Updating ${update.formId}...`);
    return updateFormStructure(update.formId, update.structure);
  });
  
  const successCount = results.filter(r => r.success).length;
  
  Logger.log(`\n📊 Batch update complete: ${successCount}/${formUpdates.length} successful`);
  
  results.forEach(result => {
    if (!result.success) {
      Logger.log(`❌ ${result.formId}: ${result.error}`);
    }
  });
  
  return results;
}

// Form Template Functions
// ═══════════════════════════════════════════════════════════════════════════════

function generateFormTemplate(profileId) {
  const profileConfig = PROFILE_CONFIG[profileId];
  if (!profileConfig) {
    throw new Error(`Profile ${profileId} not found in PROFILE_CONFIG`);
  }

  const formStructure = {
    title: `Phase 2 - ${profileConfig.title}`,
    description: `Complete questionnaire for ${profileConfig.title} profile. ${profileConfig.description}`,
    questions: []
  };

  // Add universal questions
  if (UNIVERSAL_QUESTIONS && UNIVERSAL_QUESTIONS.length > 0) {
    UNIVERSAL_QUESTIONS.forEach(question => {
      formStructure.questions.push({
        title: question.title,
        type: question.type || 'TEXT',
        helpText: question.helpText || '',
        required: question.required || false,
        choices: question.choices || null,
        headerMapping: question.headerMapping
      });
    });
  }

  return formStructure;
}

function generateAllFormTemplates() {
  Logger.log('📋 Generating templates for all profiles...\n');
  
  const templates = {};
  
  Object.keys(PROFILE_CONFIG).forEach(profileId => {
    try {
      const template = generateFormTemplate(profileId);
      templates[profileId] = template;
      Logger.log(`✅ ${profileId}: ${template.questions?.length || 0} questions`);
    } catch (error) {
      Logger.log(`❌ ${profileId}: ${error.message}`);
    }
  });
  
  return templates;
}

function previewFormTemplate(profileId) {
  try {
    const template = generateFormTemplate(profileId);
    
    Logger.log(`\n=== FORM TEMPLATE PREVIEW: ${profileId} ===`);
    Logger.log(`Title: ${template.title}`);
    Logger.log(`Description: ${template.description}`);
    Logger.log(`Questions: ${template.questions?.length || 0}\n`);
    
    if (template.questions) {
      template.questions.forEach((q, index) => {
        Logger.log(`${index + 1}. ${q.title} (${q.type})`);
        if (q.headerMapping) {
          Logger.log(`   → Maps to: ${q.headerMapping}`);
        }
      });
    }
  } catch (error) {
    Logger.log(`❌ Error generating template for ${profileId}: ${error.message}`);
  }
}

function compareFormStructures(currentForm, idealTemplate) {
  const comparison = {
    identical: false,
    differences: [],
    summary: {
      titleMatch: currentForm.metadata.title === idealTemplate.title,
      descriptionMatch: currentForm.metadata.description === idealTemplate.description,
      questionCountMatch: currentForm.items.length === (idealTemplate.questions?.length || 0),
      currentQuestionCount: currentForm.items.length,
      idealQuestionCount: idealTemplate.questions?.length || 0
    }
  };

  // Check title
  if (!comparison.summary.titleMatch) {
    comparison.differences.push({
      type: 'Title Mismatch',
      description: `Current: "${currentForm.metadata.title}" vs Ideal: "${idealTemplate.title}"`,
      current: currentForm.metadata.title,
      ideal: idealTemplate.title
    });
  }

  // Check description
  if (!comparison.summary.descriptionMatch) {
    comparison.differences.push({
      type: 'Description Mismatch',
      description: `Current: "${currentForm.metadata.description}" vs Ideal: "${idealTemplate.description}"`,
      current: currentForm.metadata.description,
      ideal: idealTemplate.description
    });
  }

  // Check question count
  if (!comparison.summary.questionCountMatch) {
    comparison.differences.push({
      type: 'Question Count Mismatch',
      description: `Current has ${comparison.summary.currentQuestionCount} questions, ideal has ${comparison.summary.idealQuestionCount}`,
      current: comparison.summary.currentQuestionCount,
      ideal: comparison.summary.idealQuestionCount
    });
  }

  // Compare individual questions (basic comparison)
  if (currentForm.items && idealTemplate.questions) {
    const maxQuestions = Math.max(currentForm.items.length, idealTemplate.questions.length);
    
    for (let i = 0; i < maxQuestions; i++) {
      const currentQ = currentForm.items[i];
      const idealQ = idealTemplate.questions[i];
      
      if (!currentQ && idealQ) {
        comparison.differences.push({
          type: 'Missing Question',
          description: `Question ${i + 1} missing in current form: "${idealQ.title}"`,
          index: i,
          ideal: idealQ.title
        });
      } else if (currentQ && !idealQ) {
        comparison.differences.push({
          type: 'Extra Question',
          description: `Question ${i + 1} exists in current but not in ideal: "${currentQ.title}"`,
          index: i,
          current: currentQ.title
        });
      } else if (currentQ && idealQ) {
        // Compare question titles
        if (currentQ.title !== idealQ.title) {
          comparison.differences.push({
            type: 'Question Title Mismatch',
            description: `Question ${i + 1} title differs`,
            index: i,
            current: currentQ.title,
            ideal: idealQ.title
          });
        }
        
        // Compare question types
        if (currentQ.type !== idealQ.type) {
          comparison.differences.push({
            type: 'Question Type Mismatch',
            description: `Question ${i + 1} type differs`,
            index: i,
            current: currentQ.type,
            ideal: idealQ.type
          });
        }
      }
    }
  }

  // Determine if forms are identical
  comparison.identical = comparison.differences.length === 0;

  return comparison;
}

// Form Sync Functions
// ═══════════════════════════════════════════════════════════════════════════════

function syncFormToTemplate(profileId, dryRun = true) {
  try {
    Logger.log(`🔄 ${dryRun ? 'DRY RUN:' : 'UPDATING:'} Syncing ${profileId} to template...`);
    
    // Get form config
    let formConfig = PROFILE_CONFIG[profileId];
    if (!formConfig) {
      formConfig = FORM_CONFIG[profileId];
    }

    if (!formConfig || !formConfig.formId) {
      return {
        success: false,
        profileId: profileId,
        error: 'No form ID found for profile'
      };
    }

    // Export current form structure
    Logger.log(`Exporting current structure for ${profileId}...`);
    const currentForm = exportFormToJSON(formConfig.formId, formConfig.name);
    
    if (!currentForm) {
      return {
        success: false,
        profileId: profileId,
        error: 'Failed to export current form structure'
      };
    }

    // Generate ideal template
    Logger.log(`Generating ideal template for ${profileId}...`);
    let idealTemplate;
    
    try {
      idealTemplate = generateFormTemplate(profileId);
    } catch (error) {
      return {
        success: false,
        profileId: profileId,
        error: `Failed to generate template: ${error.message}`
      };
    }

    // Compare structures
    Logger.log(`Comparing current vs ideal for ${profileId}...`);
    const comparison = compareFormStructures(currentForm, idealTemplate);
    
    if (comparison.identical) {
      return {
        success: true,
        profileId: profileId,
        status: 'already_synced',
        message: 'Form already matches template perfectly'
      };
    }

    // If dry run, just return the comparison
    if (dryRun) {
      return {
        success: true,
        profileId: profileId,
        status: 'dry_run_complete',
        differences: comparison.differences,
        summary: comparison.summary,
        message: `Found ${comparison.differences.length} differences. Run with dryRun=false to apply changes.`
      };
    }

    // Apply changes to the actual form
    Logger.log(`Updating form ${profileId} to match template...`);
    const updateResult = updateFormStructure(formConfig.formId, idealTemplate);
    
    if (updateResult.success) {
      return {
        success: true,
        profileId: profileId,
        status: 'updated',
        itemsAdded: updateResult.itemsAdded,
        errors: updateResult.errors,
        message: `Successfully updated form with ${updateResult.itemsAdded} items`
      };
    } else {
      return {
        success: false,
        profileId: profileId,
        error: updateResult.error
      };
    }

  } catch (error) {
    return {
      success: false,
      profileId: profileId,
      error: error.message
    };
  }
}

function syncAllFormsToTemplates(dryRun = true, profileFilter = null) {
  Logger.log(`🔄 ${dryRun ? 'DRY RUN:' : 'UPDATING:'} Syncing all forms to templates...\n`);
  
  const profilesToSync = profileFilter ? [profileFilter] : Object.keys(PROFILE_CONFIG);
  const results = [];
  
  profilesToSync.forEach(profileId => {
    Logger.log(`--- Processing ${profileId} ---`);
    const result = syncFormToTemplate(profileId, dryRun);
    results.push(result);
    
    if (result.success) {
      if (result.status === 'already_synced') {
        Logger.log(`✅ ${profileId}: Already synced`);
      } else if (result.status === 'dry_run_complete') {
        Logger.log(`📋 ${profileId}: ${result.differences.length} differences found`);
      } else {
        Logger.log(`✅ ${profileId}: Successfully synced`);
      }
    } else {
      Logger.log(`❌ ${profileId}: ${result.error}`);
    }
  });
  
  // Print detailed summary
  const successCount = results.filter(r => r.success).length;
  const alreadySynced = results.filter(r => r.status === 'already_synced').length;
  const needsUpdates = results.filter(r => r.status === 'dry_run_complete').length;
  
  Logger.log(`\n📊 SYNC SUMMARY:`);
  Logger.log(`Total profiles: ${results.length}`);
  Logger.log(`Already synced: ${alreadySynced}`);
  Logger.log(`Need updates: ${needsUpdates}`);
  Logger.log(`Errors: ${results.length - successCount}`);
  
  if (dryRun && needsUpdates > 0) {
    Logger.log(`\n🔧 To apply changes, run: syncAllFormsToTemplates(false)`);
  }
  
  return results;
}

function showFormDifferences(profileId) {
  const result = syncFormToTemplate(profileId, true); // Always dry run for differences
  
  if (!result.success) {
    Logger.log(`❌ Error analyzing ${profileId}: ${result.error}`);
    return;
  }
  
  if (result.status === 'already_synced') {
    Logger.log(`✅ ${profileId} is already perfectly synced with its template`);
    return;
  }
  
  Logger.log(`\n=== DETAILED DIFFERENCES: ${profileId} ===`);
  if (result.differences && result.differences.length > 0) {
    result.differences.forEach(diff => {
      Logger.log(`\n• ${diff.type}: ${diff.description}`);
      if (diff.current !== undefined) {
        Logger.log(`   Current: ${diff.current}`);
      }
      if (diff.ideal !== undefined) {
        Logger.log(`   Ideal: ${diff.ideal}`);
      }
      if (diff.index !== undefined) {
        Logger.log(`   Question #: ${diff.index + 1}`);
      }
      Logger.log('');
    });
  } else {
    Logger.log('No differences found');
  }
}