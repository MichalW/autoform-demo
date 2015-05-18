var selectedType = new ReactiveVar("text");
var selectedSchemaType = new ReactiveVar(String);
var selectedSchemaTypeAsString = new ReactiveVar("String");
var selectedSchemaTypeMultiple = new ReactiveVar(false);

Template.types.helpers({
  typesSchema1: function () {
    var st = selectedType.get();
    var sst = selectedSchemaType.get();
    var smt = selectedSchemaTypeMultiple.get();
    var afi = smt?{multiple: true}:{};

    return new SimpleSchema({
      typeTest: {
        type: sst,
        optional: true,
        autoform: {
          type: st,
          options: function () {
            return [
              {label: "2013", value: 2013},
              {label: "2014", value: 2014},
              {label: "2015", value: 2015}
            ];
          },
          afFieldInput: afi
        }
      }
    });
  },
  typesSchema2: function () {
    var sst = selectedSchemaType.get();
    return new SimpleSchema({
      typeTest: {
        type: sst,
        optional: true
      }
    });
  },
  selectedType: function () {
    return selectedType.get();
  },
  selectedSchemaType: function () {
    return selectedSchemaTypeAsString.get();
  },
  selectedSchemaTypeMultiple: function () {
    return selectedSchemaTypeMultiple.get();
  },
  extraInfo: function () {
    var t = selectedType.get();
    return extraInfo[t];
  },
  showOptions: function () {
    var t = selectedType.get();
    return _.contains([
      "select",
      "select-multiple",
      "select-checkbox",
      "select-checkbox-inline",
      "select-radio",
      "select-radio-inline",
      "select2",
      "selectize",
      "typeahead",
      "universe-select"
    ], t);
  },
  optionsHelper: function () {
    return [
      {label: "2013", value: 2013},
      {label: "2014", value: 2014},
      {label: "2015", value: 2015}
    ];
  }
});

Template.types.events({
  'change .type-selection': function (event) {
    selectedType.set(event.target.value);
  },
  'change .schema-type-selection': function (event) {
    var t = event.target.value;
    selectedSchemaTypeAsString.set(t);
    selectedSchemaTypeMultiple.set(false);

    switch (t) {
      case "String":
        selectedSchemaType.set(String);
        break;
      case "Number":
        selectedSchemaType.set(Number);
        break;
      case "Boolean":
        selectedSchemaType.set(Boolean);
        break;
      case "Date":
        selectedSchemaType.set(Date);
        break;
      case "[String]":
        selectedSchemaType.set([String]);
        selectedSchemaTypeMultiple.set(true);
        break;
      case "[Number]":
        selectedSchemaType.set([Number]);
        selectedSchemaTypeMultiple.set(true);
        break;
      case "[Boolean]":
        selectedSchemaType.set([Boolean]);
        selectedSchemaTypeMultiple.set(true);
        break;
      case "[Date]":
        selectedSchemaType.set([Date]);
        selectedSchemaTypeMultiple.set(true);
        break;
    }
  }
});

AutoForm.addHooks(["types1", "types2", "types3"], {
  onSubmit: function (doc) {
    console.log("Submitted value:", doc.typeTest);
    this.done();
    return false;
  }
});
