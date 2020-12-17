export function transfer_to_three_stage(specs_text) {
  specs_text = specs_text.trim(specs_text);
  specs_text = specs_text.replace(/\s+/g, ' ');
  const specs = {
    unit_large: {
      specs_unit: 1,
      specs_name: '',
    },
    unit_middle: {
      specs_unit: 1,
      specs_name: '',
    },
    unit_primary: {
      specs_unit: 1,
      specs_name: '',
    },
  };

  specs.unit_large.specs_name = specs_text.split('/')[2];
  specs.unit_middle.specs_unit = parseFloat(specs_text.split(' ')[1].split('/')[0].replace(/[^0-9]/ig, ''));
  specs.unit_middle.specs_name = specs_text.split(' ')[0].split('/')[1];
  specs.unit_primary.specs_unit = parseFloat(specs_text.split('/')[0].replace(/[^0-9]/ig, ''));
  specs.unit_primary.specs_name = specs_text.split('/')[0].replace(/[0-9]/ig, '');
  return specs;
}

export default {
  transfer_to_three_stage,
};
