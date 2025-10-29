// Auto-generated from tree-sitter Haskell v0.23.0
type HaskellTypes = {
  "class_decl": {
    "type": "class_decl",
    "named": true,
    "subtypes": [
      {
        "type": "data_family",
        "named": true
      },
      {
        "type": "decl",
        "named": true
      },
      {
        "type": "default_signature",
        "named": true
      },
      {
        "type": "fixity",
        "named": true
      },
      {
        "type": "type_family",
        "named": true
      },
      {
        "type": "type_instance",
        "named": true
      }
    ]
  },
  "constraint": {
    "type": "constraint",
    "named": true,
    "subtypes": [
      {
        "type": "apply",
        "named": true
      },
      {
        "type": "infix",
        "named": true
      },
      {
        "type": "literal",
        "named": true
      },
      {
        "type": "name",
        "named": true
      },
      {
        "type": "parens",
        "named": true
      },
      {
        "type": "prefix_id",
        "named": true
      },
      {
        "type": "prefix_tuple",
        "named": true
      },
      {
        "type": "prefix_unboxed_sum",
        "named": true
      },
      {
        "type": "prefix_unboxed_tuple",
        "named": true
      },
      {
        "type": "promoted",
        "named": true
      },
      {
        "type": "qualified",
        "named": true
      },
      {
        "type": "quasiquote",
        "named": true
      },
      {
        "type": "splice",
        "named": true
      },
      {
        "type": "tuple",
        "named": true
      },
      {
        "type": "unboxed_unit",
        "named": true
      },
      {
        "type": "unit",
        "named": true
      },
      {
        "type": "variable",
        "named": true
      },
      {
        "type": "wildcard",
        "named": true
      }
    ]
  },
  "constraints": {
    "type": "constraints",
    "named": true,
    "subtypes": [
      {
        "type": "constraint",
        "named": true
      },
      {
        "type": "context",
        "named": true
      },
      {
        "type": "forall",
        "named": true
      },
      {
        "type": "implicit_parameter",
        "named": true
      },
      {
        "type": "signature",
        "named": true
      }
    ]
  },
  "decl": {
    "type": "decl",
    "named": true,
    "subtypes": [
      {
        "type": "bind",
        "named": true
      },
      {
        "type": "function",
        "named": true
      },
      {
        "type": "signature",
        "named": true
      }
    ]
  },
  "declaration": {
    "type": "declaration",
    "named": true,
    "subtypes": [
      {
        "type": "class",
        "named": true
      },
      {
        "type": "data_family",
        "named": true
      },
      {
        "type": "data_instance",
        "named": true
      },
      {
        "type": "data_type",
        "named": true
      },
      {
        "type": "decl",
        "named": true
      },
      {
        "type": "default_types",
        "named": true
      },
      {
        "type": "deriving_instance",
        "named": true
      },
      {
        "type": "fixity",
        "named": true
      },
      {
        "type": "foreign_export",
        "named": true
      },
      {
        "type": "foreign_import",
        "named": true
      },
      {
        "type": "instance",
        "named": true
      },
      {
        "type": "kind_signature",
        "named": true
      },
      {
        "type": "newtype",
        "named": true
      },
      {
        "type": "pattern_synonym",
        "named": true
      },
      {
        "type": "role_annotation",
        "named": true
      },
      {
        "type": "top_splice",
        "named": true
      },
      {
        "type": "type_family",
        "named": true
      },
      {
        "type": "type_instance",
        "named": true
      },
      {
        "type": "type_synomym",
        "named": true
      }
    ]
  },
  "expression": {
    "type": "expression",
    "named": true,
    "subtypes": [
      {
        "type": "apply",
        "named": true
      },
      {
        "type": "arithmetic_sequence",
        "named": true
      },
      {
        "type": "case",
        "named": true
      },
      {
        "type": "conditional",
        "named": true
      },
      {
        "type": "constructor",
        "named": true
      },
      {
        "type": "do",
        "named": true
      },
      {
        "type": "implicit_variable",
        "named": true
      },
      {
        "type": "infix",
        "named": true
      },
      {
        "type": "label",
        "named": true
      },
      {
        "type": "lambda",
        "named": true
      },
      {
        "type": "lambda_case",
        "named": true
      },
      {
        "type": "lambda_cases",
        "named": true
      },
      {
        "type": "left_section",
        "named": true
      },
      {
        "type": "let_in",
        "named": true
      },
      {
        "type": "list",
        "named": true
      },
      {
        "type": "list_comprehension",
        "named": true
      },
      {
        "type": "literal",
        "named": true
      },
      {
        "type": "multi_way_if",
        "named": true
      },
      {
        "type": "negation",
        "named": true
      },
      {
        "type": "parens",
        "named": true
      },
      {
        "type": "prefix_id",
        "named": true
      },
      {
        "type": "prefix_tuple",
        "named": true
      },
      {
        "type": "prefix_unboxed_sum",
        "named": true
      },
      {
        "type": "prefix_unboxed_tuple",
        "named": true
      },
      {
        "type": "projection",
        "named": true
      },
      {
        "type": "projection_selector",
        "named": true
      },
      {
        "type": "qualified",
        "named": true
      },
      {
        "type": "quasiquote",
        "named": true
      },
      {
        "type": "quote",
        "named": true
      },
      {
        "type": "record",
        "named": true
      },
      {
        "type": "right_section",
        "named": true
      },
      {
        "type": "splice",
        "named": true
      },
      {
        "type": "th_quoted_name",
        "named": true
      },
      {
        "type": "tuple",
        "named": true
      },
      {
        "type": "typed_quote",
        "named": true
      },
      {
        "type": "unboxed_sum",
        "named": true
      },
      {
        "type": "unboxed_tuple",
        "named": true
      },
      {
        "type": "unboxed_unit",
        "named": true
      },
      {
        "type": "unit",
        "named": true
      },
      {
        "type": "variable",
        "named": true
      }
    ]
  },
  "guard": {
    "type": "guard",
    "named": true,
    "subtypes": [
      {
        "type": "boolean",
        "named": true
      },
      {
        "type": "let",
        "named": true
      },
      {
        "type": "pattern_guard",
        "named": true
      }
    ]
  },
  "instance_decl": {
    "type": "instance_decl",
    "named": true,
    "subtypes": [
      {
        "type": "data_instance",
        "named": true
      },
      {
        "type": "decl",
        "named": true
      },
      {
        "type": "type_instance",
        "named": true
      }
    ]
  },
  "pattern": {
    "type": "pattern",
    "named": true,
    "subtypes": [
      {
        "type": "apply",
        "named": true
      },
      {
        "type": "as",
        "named": true
      },
      {
        "type": "constructor",
        "named": true
      },
      {
        "type": "infix",
        "named": true
      },
      {
        "type": "irrefutable",
        "named": true
      },
      {
        "type": "list",
        "named": true
      },
      {
        "type": "literal",
        "named": true
      },
      {
        "type": "negation",
        "named": true
      },
      {
        "type": "parens",
        "named": true
      },
      {
        "type": "prefix_id",
        "named": true
      },
      {
        "type": "prefix_tuple",
        "named": true
      },
      {
        "type": "prefix_unboxed_sum",
        "named": true
      },
      {
        "type": "prefix_unboxed_tuple",
        "named": true
      },
      {
        "type": "qualified",
        "named": true
      },
      {
        "type": "quasiquote",
        "named": true
      },
      {
        "type": "record",
        "named": true
      },
      {
        "type": "splice",
        "named": true
      },
      {
        "type": "strict",
        "named": true
      },
      {
        "type": "tuple",
        "named": true
      },
      {
        "type": "unboxed_sum",
        "named": true
      },
      {
        "type": "unboxed_tuple",
        "named": true
      },
      {
        "type": "unboxed_unit",
        "named": true
      },
      {
        "type": "unit",
        "named": true
      },
      {
        "type": "variable",
        "named": true
      },
      {
        "type": "wildcard",
        "named": true
      }
    ]
  },
  "qualifier": {
    "type": "qualifier",
    "named": true,
    "subtypes": [
      {
        "type": "boolean",
        "named": true
      },
      {
        "type": "generator",
        "named": true
      },
      {
        "type": "group",
        "named": true
      },
      {
        "type": "let",
        "named": true
      },
      {
        "type": "transform",
        "named": true
      }
    ]
  },
  "quantified_type": {
    "type": "quantified_type",
    "named": true,
    "subtypes": [
      {
        "type": "context",
        "named": true
      },
      {
        "type": "forall",
        "named": true
      },
      {
        "type": "forall_required",
        "named": true
      },
      {
        "type": "function",
        "named": true
      },
      {
        "type": "implicit_parameter",
        "named": true
      },
      {
        "type": "linear_function",
        "named": true
      },
      {
        "type": "type",
        "named": true
      }
    ]
  },
  "statement": {
    "type": "statement",
    "named": true,
    "subtypes": [
      {
        "type": "bind",
        "named": true
      },
      {
        "type": "exp",
        "named": true
      },
      {
        "type": "let",
        "named": true
      },
      {
        "type": "rec",
        "named": true
      }
    ]
  },
  "type": {
    "type": "type",
    "named": true,
    "subtypes": [
      {
        "type": "apply",
        "named": true
      },
      {
        "type": "infix",
        "named": true
      },
      {
        "type": "list",
        "named": true
      },
      {
        "type": "literal",
        "named": true
      },
      {
        "type": "name",
        "named": true
      },
      {
        "type": "parens",
        "named": true
      },
      {
        "type": "prefix_id",
        "named": true
      },
      {
        "type": "prefix_list",
        "named": true
      },
      {
        "type": "prefix_tuple",
        "named": true
      },
      {
        "type": "prefix_unboxed_sum",
        "named": true
      },
      {
        "type": "prefix_unboxed_tuple",
        "named": true
      },
      {
        "type": "promoted",
        "named": true
      },
      {
        "type": "qualified",
        "named": true
      },
      {
        "type": "quasiquote",
        "named": true
      },
      {
        "type": "splice",
        "named": true
      },
      {
        "type": "star",
        "named": true
      },
      {
        "type": "tuple",
        "named": true
      },
      {
        "type": "unboxed_sum",
        "named": true
      },
      {
        "type": "unboxed_tuple",
        "named": true
      },
      {
        "type": "unboxed_unit",
        "named": true
      },
      {
        "type": "unit",
        "named": true
      },
      {
        "type": "variable",
        "named": true
      },
      {
        "type": "wildcard",
        "named": true
      }
    ]
  },
  "type_param": {
    "type": "type_param",
    "named": true,
    "subtypes": [
      {
        "type": "invisible",
        "named": true
      },
      {
        "type": "parens",
        "named": true
      },
      {
        "type": "variable",
        "named": true
      },
      {
        "type": "wildcard",
        "named": true
      }
    ]
  },
  "abstract_family": {
    "type": "abstract_family",
    "named": true,
    "fields": {}
  },
  "alternative": {
    "type": "alternative",
    "named": true,
    "fields": {
      "binds": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "local_binds",
            "named": true
          }
        ]
      },
      "match": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "match",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "patterns",
            "named": true
          }
        ]
      }
    }
  },
  "alternatives": {
    "type": "alternatives",
    "named": true,
    "fields": {
      "alternative": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "alternative",
            "named": true
          }
        ]
      }
    }
  },
  "annotated": {
    "type": "annotated",
    "named": true,
    "fields": {
      "kind": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "type_param",
          "named": true
        }
      ]
    }
  },
  "apply": {
    "type": "apply",
    "named": true,
    "fields": {
      "argument": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "explicit_type",
            "named": true
          },
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "kind_application",
            "named": true
          },
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "type",
            "named": true
          },
          {
            "type": "type_application",
            "named": true
          },
          {
            "type": "type_binder",
            "named": true
          }
        ]
      },
      "constructor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constraint",
            "named": true
          },
          {
            "type": "type",
            "named": true
          }
        ]
      },
      "function": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "pattern",
            "named": true
          }
        ]
      }
    }
  },
  "arithmetic_sequence": {
    "type": "arithmetic_sequence",
    "named": true,
    "fields": {
      "from": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "step": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "to": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "as": {
    "type": "as",
    "named": true,
    "fields": {
      "bind": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "pattern",
            "named": true
          }
        ]
      }
    }
  },
  "associated_type": {
    "type": "associated_type",
    "named": true,
    "fields": {
      "namespace": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      }
    }
  },
  "bind": {
    "type": "bind",
    "named": true,
    "fields": {
      "arrow": {
        "multiple": false,
        "required": false,
        "types": []
      },
      "binds": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "local_binds",
            "named": true
          }
        ]
      },
      "expression": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "implicit": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "implicit_variable",
            "named": true
          }
        ]
      },
      "match": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "match",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "binding_list": {
    "type": "binding_list",
    "named": true,
    "fields": {
      "name": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "boolean": {
    "type": "boolean",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "expression",
          "named": true
        },
        {
          "type": "signature",
          "named": true
        }
      ]
    }
  },
  "case": {
    "type": "case",
    "named": true,
    "fields": {
      "alternatives": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "alternatives",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "expression",
          "named": true
        },
        {
          "type": "signature",
          "named": true
        }
      ]
    }
  },
  "children": {
    "type": "children",
    "named": true,
    "fields": {
      "element": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "all_names",
            "named": true
          },
          {
            "type": "associated_type",
            "named": true
          },
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "class": {
    "type": "class",
    "named": true,
    "fields": {
      "context": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "context",
            "named": true
          }
        ]
      },
      "declarations": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "class_declarations",
            "named": true
          }
        ]
      },
      "fundeps": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "fundeps",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "prefix_list",
            "named": true
          },
          {
            "type": "unit",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_params",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        }
      ]
    }
  },
  "class_declarations": {
    "type": "class_declarations",
    "named": true,
    "fields": {
      "declaration": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "class_decl",
            "named": true
          }
        ]
      }
    }
  },
  "conditional": {
    "type": "conditional",
    "named": true,
    "fields": {
      "else": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "if": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "then": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "constructor_operator": {
    "type": "constructor_operator",
    "named": true,
    "fields": {}
  },
  "constructor_synonym": {
    "type": "constructor_synonym",
    "named": true,
    "fields": {
      "binds": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "local_binds",
            "named": true
          }
        ]
      },
      "implicit": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "implicit_variable",
            "named": true
          }
        ]
      },
      "match": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "match",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "constructor_synonyms": {
    "type": "constructor_synonyms",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "constructor_synonym",
          "named": true
        }
      ]
    }
  },
  "context": {
    "type": "context",
    "named": true,
    "fields": {
      "arrow": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "constraint": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constraints",
            "named": true
          }
        ]
      },
      "context": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "constraint",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    }
  },
  "data_constructor": {
    "type": "data_constructor",
    "named": true,
    "fields": {
      "constructor": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "infix",
            "named": true
          },
          {
            "type": "prefix",
            "named": true
          },
          {
            "type": "record",
            "named": true
          },
          {
            "type": "special",
            "named": true
          }
        ]
      },
      "context": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "context",
            "named": true
          }
        ]
      },
      "forall": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "forall",
            "named": true
          },
          {
            "type": "forall_required",
            "named": true
          }
        ]
      }
    }
  },
  "data_constructors": {
    "type": "data_constructors",
    "named": true,
    "fields": {
      "constructor": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "data_constructor",
            "named": true
          }
        ]
      }
    }
  },
  "data_family": {
    "type": "data_family",
    "named": true,
    "fields": {
      "kind": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "prefix_list",
            "named": true
          },
          {
            "type": "unit",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_params",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        }
      ]
    }
  },
  "data_instance": {
    "type": "data_instance",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "data_type",
          "named": true
        },
        {
          "type": "newtype",
          "named": true
        }
      ]
    }
  },
  "data_type": {
    "type": "data_type",
    "named": true,
    "fields": {
      "constructors": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "data_constructors",
            "named": true
          },
          {
            "type": "gadt_constructors",
            "named": true
          }
        ]
      },
      "context": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "context",
            "named": true
          }
        ]
      },
      "deriving": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "deriving",
            "named": true
          }
        ]
      },
      "forall": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "forall",
            "named": true
          },
          {
            "type": "forall_required",
            "named": true
          }
        ]
      },
      "kind": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "prefix_list",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          },
          {
            "type": "unit",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_params",
            "named": true
          },
          {
            "type": "type_patterns",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        }
      ]
    }
  },
  "declarations": {
    "type": "declarations",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "declaration",
          "named": true
        },
        {
          "type": "import",
          "named": true
        }
      ]
    }
  },
  "default_signature": {
    "type": "default_signature",
    "named": true,
    "fields": {
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "default_types": {
    "type": "default_types",
    "named": true,
    "fields": {
      "type": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "deriving": {
    "type": "deriving",
    "named": true,
    "fields": {
      "classes": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "constraint",
            "named": true
          }
        ]
      },
      "strategy": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "deriving_strategy",
            "named": true
          }
        ]
      },
      "via": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "via",
            "named": true
          }
        ]
      }
    }
  },
  "deriving_instance": {
    "type": "deriving_instance",
    "named": true,
    "fields": {
      "context": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "context",
            "named": true
          }
        ]
      },
      "forall": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "forall",
            "named": true
          },
          {
            "type": "forall_required",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_patterns",
            "named": true
          }
        ]
      },
      "strategy": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "deriving_strategy",
            "named": true
          }
        ]
      },
      "via": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "via",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        }
      ]
    }
  },
  "deriving_strategy": {
    "type": "deriving_strategy",
    "named": true,
    "fields": {}
  },
  "do": {
    "type": "do",
    "named": true,
    "fields": {
      "statement": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "statement",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "do_module",
          "named": true
        }
      ]
    }
  },
  "do_module": {
    "type": "do_module",
    "named": true,
    "fields": {
      "id": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "module": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "module",
            "named": true
          }
        ]
      }
    }
  },
  "empty_list": {
    "type": "empty_list",
    "named": true,
    "fields": {}
  },
  "entity": {
    "type": "entity",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "string",
          "named": true
        }
      ]
    }
  },
  "equation": {
    "type": "equation",
    "named": true,
    "fields": {
      "constructors": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constructor_synonyms",
            "named": true
          }
        ]
      },
      "forall": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "forall",
            "named": true
          },
          {
            "type": "forall_required",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_patterns",
            "named": true
          }
        ]
      },
      "synonym": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        },
        {
          "type": "quantified_type",
          "named": true
        }
      ]
    }
  },
  "equations": {
    "type": "equations",
    "named": true,
    "fields": {
      "equation": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "equation",
            "named": true
          }
        ]
      }
    }
  },
  "exp": {
    "type": "exp",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "expression",
          "named": true
        },
        {
          "type": "signature",
          "named": true
        }
      ]
    }
  },
  "explicit_type": {
    "type": "explicit_type",
    "named": true,
    "fields": {
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "export": {
    "type": "export",
    "named": true,
    "fields": {
      "children": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "children",
            "named": true
          }
        ]
      },
      "namespace": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "namespace",
            "named": true
          }
        ]
      },
      "operator": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "prefix_id",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "variable": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "qualified",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "exports": {
    "type": "exports",
    "named": true,
    "fields": {
      "export": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "export",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "module_export",
          "named": true
        }
      ]
    }
  },
  "field": {
    "type": "field",
    "named": true,
    "fields": {
      "name": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "field_name",
            "named": true
          }
        ]
      },
      "parameter": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "lazy_field",
            "named": true
          },
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "strict_field",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "lazy_field",
            "named": true
          },
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "strict_field",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "field_name": {
    "type": "field_name",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "variable",
          "named": true
        }
      ]
    }
  },
  "field_path": {
    "type": "field_path",
    "named": true,
    "fields": {
      "field": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "field_name",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "subfield": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "field_name",
            "named": true
          }
        ]
      }
    }
  },
  "field_pattern": {
    "type": "field_pattern",
    "named": true,
    "fields": {
      "field": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "field_name",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          },
          {
            "type": "view_pattern",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "wildcard",
          "named": true
        }
      ]
    }
  },
  "field_update": {
    "type": "field_update",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "field": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "field_name",
            "named": true
          },
          {
            "type": "field_path",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "wildcard",
          "named": true
        }
      ]
    }
  },
  "fields": {
    "type": "fields",
    "named": true,
    "fields": {
      "field": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "field",
            "named": true
          }
        ]
      }
    }
  },
  "fixity": {
    "type": "fixity",
    "named": true,
    "fields": {
      "associativity": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "operator": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "constructor_operator",
            "named": true
          },
          {
            "type": "infix_id",
            "named": true
          },
          {
            "type": "operator",
            "named": true
          }
        ]
      },
      "precedence": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "integer",
            "named": true
          }
        ]
      }
    }
  },
  "forall": {
    "type": "forall",
    "named": true,
    "fields": {
      "constraint": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constraints",
            "named": true
          }
        ]
      },
      "quantifier": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "variables": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_variables",
            "named": true
          }
        ]
      }
    }
  },
  "forall_required": {
    "type": "forall_required",
    "named": true,
    "fields": {
      "quantifier": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "variables": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_variables",
            "named": true
          }
        ]
      }
    }
  },
  "foreign_export": {
    "type": "foreign_export",
    "named": true,
    "fields": {
      "calling_convention": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "calling_convention",
            "named": true
          }
        ]
      },
      "entity": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "entity",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "foreign_import": {
    "type": "foreign_import",
    "named": true,
    "fields": {
      "calling_convention": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "calling_convention",
            "named": true
          }
        ]
      },
      "entity": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "entity",
            "named": true
          }
        ]
      },
      "safety": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "safety",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "function": {
    "type": "function",
    "named": true,
    "fields": {
      "arrow": {
        "multiple": false,
        "required": false,
        "types": []
      },
      "binds": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "local_binds",
            "named": true
          }
        ]
      },
      "match": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "match",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "parameter": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "lazy_field",
            "named": true
          },
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "strict_field",
            "named": true
          }
        ]
      },
      "parens": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "function_head_parens",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "patterns",
            "named": true
          }
        ]
      },
      "result": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        }
      ]
    }
  },
  "function_head_parens": {
    "type": "function_head_parens",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "parens": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "function_head_parens",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "patterns",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        }
      ]
    }
  },
  "fundep": {
    "type": "fundep",
    "named": true,
    "fields": {
      "determined": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "matched": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "fundeps": {
    "type": "fundeps",
    "named": true,
    "fields": {
      "fundep": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "fundep",
            "named": true
          }
        ]
      }
    }
  },
  "gadt_constructor": {
    "type": "gadt_constructor",
    "named": true,
    "fields": {
      "context": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "context",
            "named": true
          }
        ]
      },
      "forall": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "forall",
            "named": true
          },
          {
            "type": "forall_required",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          }
        ]
      },
      "names": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "binding_list",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "prefix",
            "named": true
          },
          {
            "type": "record",
            "named": true
          }
        ]
      }
    }
  },
  "gadt_constructors": {
    "type": "gadt_constructors",
    "named": true,
    "fields": {
      "constructor": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "gadt_constructor",
            "named": true
          }
        ]
      }
    }
  },
  "generator": {
    "type": "generator",
    "named": true,
    "fields": {
      "arrow": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "group": {
    "type": "group",
    "named": true,
    "fields": {
      "classifier": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "key": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "guards": {
    "type": "guards",
    "named": true,
    "fields": {
      "guard": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "guard",
            "named": true
          }
        ]
      }
    }
  },
  "haskell": {
    "type": "haskell",
    "named": true,
    "fields": {
      "declarations": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "declarations",
            "named": true
          }
        ]
      },
      "imports": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "imports",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "header",
          "named": true
        }
      ]
    }
  },
  "header": {
    "type": "header",
    "named": true,
    "fields": {
      "exports": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "exports",
            "named": true
          }
        ]
      },
      "module": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "module",
            "named": true
          }
        ]
      }
    }
  },
  "implicit_parameter": {
    "type": "implicit_parameter",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "implicit_variable",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    }
  },
  "import": {
    "type": "import",
    "named": true,
    "fields": {
      "alias": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "module",
            "named": true
          }
        ]
      },
      "module": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "module",
            "named": true
          }
        ]
      },
      "names": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "import_list",
            "named": true
          }
        ]
      },
      "package": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "import_package",
            "named": true
          }
        ]
      }
    }
  },
  "import_list": {
    "type": "import_list",
    "named": true,
    "fields": {
      "name": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "import_name",
            "named": true
          }
        ]
      }
    }
  },
  "import_name": {
    "type": "import_name",
    "named": true,
    "fields": {
      "children": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "children",
            "named": true
          }
        ]
      },
      "namespace": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "namespace",
            "named": true
          }
        ]
      },
      "operator": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "prefix_id",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "variable": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "qualified",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "imports": {
    "type": "imports",
    "named": true,
    "fields": {
      "import": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "import",
            "named": true
          }
        ]
      }
    }
  },
  "inferred": {
    "type": "inferred",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "annotated",
          "named": true
        },
        {
          "type": "type_param",
          "named": true
        }
      ]
    }
  },
  "infix": {
    "type": "infix",
    "named": true,
    "fields": {
      "left_operand": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "lazy_field",
            "named": true
          },
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "strict_field",
            "named": true
          },
          {
            "type": "type",
            "named": true
          },
          {
            "type": "type_param",
            "named": true
          }
        ]
      },
      "operator": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "constructor_operator",
            "named": true
          },
          {
            "type": "infix_id",
            "named": true
          },
          {
            "type": "operator",
            "named": true
          },
          {
            "type": "promoted",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "right_operand": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "lazy_field",
            "named": true
          },
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "strict_field",
            "named": true
          },
          {
            "type": "type",
            "named": true
          },
          {
            "type": "type_param",
            "named": true
          }
        ]
      }
    }
  },
  "infix_id": {
    "type": "infix_id",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "constructor",
          "named": true
        },
        {
          "type": "name",
          "named": true
        },
        {
          "type": "qualified",
          "named": true
        },
        {
          "type": "variable",
          "named": true
        }
      ]
    }
  },
  "instance": {
    "type": "instance",
    "named": true,
    "fields": {
      "context": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "context",
            "named": true
          }
        ]
      },
      "declarations": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "instance_declarations",
            "named": true
          }
        ]
      },
      "forall": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "forall",
            "named": true
          },
          {
            "type": "forall_required",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_patterns",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        }
      ]
    }
  },
  "instance_declarations": {
    "type": "instance_declarations",
    "named": true,
    "fields": {
      "declaration": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "instance_decl",
            "named": true
          }
        ]
      }
    }
  },
  "integer": {
    "type": "integer",
    "named": true,
    "fields": {}
  },
  "invisible": {
    "type": "invisible",
    "named": true,
    "fields": {
      "bind": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type_param",
            "named": true
          }
        ]
      }
    }
  },
  "irrefutable": {
    "type": "irrefutable",
    "named": true,
    "fields": {
      "pattern": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "pattern",
            "named": true
          }
        ]
      }
    }
  },
  "kind_application": {
    "type": "kind_application",
    "named": true,
    "fields": {
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "kind_signature": {
    "type": "kind_signature",
    "named": true,
    "fields": {
      "kind": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "prefix_list",
            "named": true
          },
          {
            "type": "unit",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_params",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        }
      ]
    }
  },
  "lambda": {
    "type": "lambda",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "patterns",
            "named": true
          }
        ]
      }
    }
  },
  "lambda_case": {
    "type": "lambda_case",
    "named": true,
    "fields": {
      "alternatives": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "alternatives",
            "named": true
          }
        ]
      }
    }
  },
  "lambda_cases": {
    "type": "lambda_cases",
    "named": true,
    "fields": {
      "alternatives": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "alternatives",
            "named": true
          }
        ]
      }
    }
  },
  "lazy_field": {
    "type": "lazy_field",
    "named": true,
    "fields": {
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "left_section": {
    "type": "left_section",
    "named": true,
    "fields": {
      "left_operand": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "operator": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "constructor_operator",
            "named": true
          },
          {
            "type": "infix_id",
            "named": true
          },
          {
            "type": "operator",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      }
    }
  },
  "let": {
    "type": "let",
    "named": true,
    "fields": {
      "binds": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "local_binds",
            "named": true
          }
        ]
      }
    }
  },
  "let_in": {
    "type": "let_in",
    "named": true,
    "fields": {
      "binds": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "local_binds",
            "named": true
          }
        ]
      },
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "linear_function": {
    "type": "linear_function",
    "named": true,
    "fields": {
      "arrow": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "multiplicity": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "modifier",
            "named": true
          }
        ]
      },
      "parameter": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "lazy_field",
            "named": true
          },
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "strict_field",
            "named": true
          }
        ]
      },
      "result": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    }
  },
  "list": {
    "type": "list",
    "named": true,
    "fields": {
      "element": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          },
          {
            "type": "view_pattern",
            "named": true
          }
        ]
      }
    }
  },
  "list_comprehension": {
    "type": "list_comprehension",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "qualifiers": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "qualifiers",
            "named": true
          }
        ]
      }
    }
  },
  "literal": {
    "type": "literal",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "char",
          "named": true
        },
        {
          "type": "float",
          "named": true
        },
        {
          "type": "integer",
          "named": true
        },
        {
          "type": "string",
          "named": true
        }
      ]
    }
  },
  "local_binds": {
    "type": "local_binds",
    "named": true,
    "fields": {
      "decl": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "decl",
            "named": true
          },
          {
            "type": "fixity",
            "named": true
          }
        ]
      }
    }
  },
  "match": {
    "type": "match",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "guards": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "guards",
            "named": true
          }
        ]
      }
    }
  },
  "modifier": {
    "type": "modifier",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "module": {
    "type": "module",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "module_id",
          "named": true
        }
      ]
    }
  },
  "module_export": {
    "type": "module_export",
    "named": true,
    "fields": {
      "module": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "module",
            "named": true
          }
        ]
      }
    }
  },
  "multi_way_if": {
    "type": "multi_way_if",
    "named": true,
    "fields": {
      "match": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "match",
            "named": true
          }
        ]
      }
    }
  },
  "namespace": {
    "type": "namespace",
    "named": true,
    "fields": {}
  },
  "negation": {
    "type": "negation",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "minus": {
        "multiple": false,
        "required": false,
        "types": []
      },
      "number": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "float",
            "named": true
          },
          {
            "type": "integer",
            "named": true
          }
        ]
      }
    }
  },
  "newtype": {
    "type": "newtype",
    "named": true,
    "fields": {
      "constructor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "newtype_constructor",
            "named": true
          }
        ]
      },
      "constructors": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "gadt_constructors",
            "named": true
          }
        ]
      },
      "context": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "context",
            "named": true
          }
        ]
      },
      "deriving": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "deriving",
            "named": true
          }
        ]
      },
      "forall": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "forall",
            "named": true
          },
          {
            "type": "forall_required",
            "named": true
          }
        ]
      },
      "kind": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "prefix_list",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          },
          {
            "type": "unit",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_params",
            "named": true
          },
          {
            "type": "type_patterns",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        }
      ]
    }
  },
  "newtype_constructor": {
    "type": "newtype_constructor",
    "named": true,
    "fields": {
      "field": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "field",
            "named": true
          },
          {
            "type": "record",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          }
        ]
      }
    }
  },
  "operator": {
    "type": "operator",
    "named": true,
    "fields": {}
  },
  "parens": {
    "type": "parens",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "kind": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "prefix_list",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          },
          {
            "type": "unit",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          },
          {
            "type": "view_pattern",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_params",
            "named": true
          },
          {
            "type": "type_patterns",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "annotated",
          "named": true
        },
        {
          "type": "constraints",
          "named": true
        },
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "type_param",
          "named": true
        }
      ]
    }
  },
  "pattern_guard": {
    "type": "pattern_guard",
    "named": true,
    "fields": {
      "arrow": {
        "multiple": false,
        "required": true,
        "types": []
      },
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "pattern_synonym": {
    "type": "pattern_synonym",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "equation",
          "named": true
        },
        {
          "type": "signature",
          "named": true
        }
      ]
    }
  },
  "patterns": {
    "type": "patterns",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "explicit_type",
          "named": true
        },
        {
          "type": "pattern",
          "named": true
        },
        {
          "type": "type_binder",
          "named": true
        }
      ]
    }
  },
  "prefix": {
    "type": "prefix",
    "named": true,
    "fields": {
      "field": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "lazy_field",
            "named": true
          },
          {
            "type": "strict_field",
            "named": true
          },
          {
            "type": "type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    }
  },
  "prefix_id": {
    "type": "prefix_id",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "constructor_operator",
          "named": true
        },
        {
          "type": "operator",
          "named": true
        },
        {
          "type": "qualified",
          "named": true
        }
      ]
    }
  },
  "prefix_list": {
    "type": "prefix_list",
    "named": true,
    "fields": {}
  },
  "prefix_tuple": {
    "type": "prefix_tuple",
    "named": true,
    "fields": {}
  },
  "prefix_unboxed_sum": {
    "type": "prefix_unboxed_sum",
    "named": true,
    "fields": {}
  },
  "prefix_unboxed_tuple": {
    "type": "prefix_unboxed_tuple",
    "named": true,
    "fields": {}
  },
  "projection": {
    "type": "projection",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "field": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "field_name",
            "named": true
          }
        ]
      }
    }
  },
  "projection_selector": {
    "type": "projection_selector",
    "named": true,
    "fields": {
      "field": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "promoted": {
    "type": "promoted",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "constructor",
          "named": true
        },
        {
          "type": "constructor_operator",
          "named": true
        },
        {
          "type": "empty_list",
          "named": true
        },
        {
          "type": "infix_id",
          "named": true
        },
        {
          "type": "list",
          "named": true
        },
        {
          "type": "operator",
          "named": true
        },
        {
          "type": "prefix_id",
          "named": true
        },
        {
          "type": "prefix_tuple",
          "named": true
        },
        {
          "type": "qualified",
          "named": true
        },
        {
          "type": "tuple",
          "named": true
        },
        {
          "type": "unit",
          "named": true
        }
      ]
    }
  },
  "qualified": {
    "type": "qualified",
    "named": true,
    "fields": {
      "id": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "constructor_operator",
            "named": true
          },
          {
            "type": "field_name",
            "named": true
          },
          {
            "type": "name",
            "named": true
          },
          {
            "type": "operator",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "module": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "module",
            "named": true
          }
        ]
      }
    }
  },
  "qualifiers": {
    "type": "qualifiers",
    "named": true,
    "fields": {
      "qualifier": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "qualifier",
            "named": true
          }
        ]
      }
    }
  },
  "quantified_variables": {
    "type": "quantified_variables",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "inferred",
          "named": true
        },
        {
          "type": "type_param",
          "named": true
        }
      ]
    }
  },
  "quasiquote": {
    "type": "quasiquote",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quasiquote_body",
            "named": true
          }
        ]
      },
      "quoter": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "quoter",
            "named": true
          }
        ]
      }
    }
  },
  "quote": {
    "type": "quote",
    "named": true,
    "fields": {
      "quoter": {
        "multiple": false,
        "required": false,
        "types": []
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "quoted_decls",
          "named": true
        },
        {
          "type": "quoted_expression",
          "named": true
        },
        {
          "type": "quoted_pattern",
          "named": true
        },
        {
          "type": "quoted_type",
          "named": true
        }
      ]
    }
  },
  "quoted_decls": {
    "type": "quoted_decls",
    "named": true,
    "fields": {
      "declaration": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "declaration",
            "named": true
          }
        ]
      }
    }
  },
  "quoted_expression": {
    "type": "quoted_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "expression",
          "named": true
        },
        {
          "type": "signature",
          "named": true
        }
      ]
    }
  },
  "quoted_pattern": {
    "type": "quoted_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "pattern",
          "named": true
        },
        {
          "type": "signature",
          "named": true
        }
      ]
    }
  },
  "quoted_type": {
    "type": "quoted_type",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "quantified_type",
          "named": true
        },
        {
          "type": "signature",
          "named": true
        }
      ]
    }
  },
  "quoter": {
    "type": "quoter",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "qualified",
          "named": true
        },
        {
          "type": "variable",
          "named": true
        }
      ]
    }
  },
  "rec": {
    "type": "rec",
    "named": true,
    "fields": {
      "statement": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "statement",
            "named": true
          }
        ]
      }
    }
  },
  "record": {
    "type": "record",
    "named": true,
    "fields": {
      "arrow": {
        "multiple": true,
        "required": false,
        "types": []
      },
      "constructor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          }
        ]
      },
      "expression": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "field": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "field",
            "named": true
          },
          {
            "type": "field_pattern",
            "named": true
          },
          {
            "type": "field_update",
            "named": true
          }
        ]
      },
      "fields": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "fields",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constructor",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    }
  },
  "right_section": {
    "type": "right_section",
    "named": true,
    "fields": {
      "right_operand": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "constructor_operator",
          "named": true
        },
        {
          "type": "infix_id",
          "named": true
        },
        {
          "type": "operator",
          "named": true
        },
        {
          "type": "qualified",
          "named": true
        }
      ]
    }
  },
  "role_annotation": {
    "type": "role_annotation",
    "named": true,
    "fields": {
      "role": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "type_role",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      }
    }
  },
  "signature": {
    "type": "signature",
    "named": true,
    "fields": {
      "constraint": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constraints",
            "named": true
          }
        ]
      },
      "expression": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          }
        ]
      },
      "kind": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "names": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "binding_list",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "pattern",
            "named": true
          }
        ]
      },
      "synonym": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "binding_list",
            "named": true
          },
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    }
  },
  "special": {
    "type": "special",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "empty_list",
          "named": true
        },
        {
          "type": "tuple",
          "named": true
        },
        {
          "type": "unboxed_sum",
          "named": true
        },
        {
          "type": "unboxed_tuple",
          "named": true
        },
        {
          "type": "unboxed_unit",
          "named": true
        },
        {
          "type": "unit",
          "named": true
        }
      ]
    }
  },
  "splice": {
    "type": "splice",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "implicit_variable",
            "named": true
          },
          {
            "type": "label",
            "named": true
          },
          {
            "type": "literal",
            "named": true
          },
          {
            "type": "parens",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "star": {
    "type": "star",
    "named": true,
    "fields": {}
  },
  "strict": {
    "type": "strict",
    "named": true,
    "fields": {
      "pattern": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "pattern",
            "named": true
          }
        ]
      }
    }
  },
  "strict_field": {
    "type": "strict_field",
    "named": true,
    "fields": {
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "th_quoted_name": {
    "type": "th_quoted_name",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "constructor",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          },
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "top_splice": {
    "type": "top_splice",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "expression",
          "named": true
        }
      ]
    }
  },
  "transform": {
    "type": "transform",
    "named": true,
    "fields": {
      "key": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "transformation": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    }
  },
  "tuple": {
    "type": "tuple",
    "named": true,
    "fields": {
      "element": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          },
          {
            "type": "view_pattern",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "constraints",
          "named": true
        }
      ]
    }
  },
  "type_application": {
    "type": "type_application",
    "named": true,
    "fields": {
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "type_binder": {
    "type": "type_binder",
    "named": true,
    "fields": {
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "type_family": {
    "type": "type_family",
    "named": true,
    "fields": {
      "closed_family": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "abstract_family",
            "named": true
          },
          {
            "type": "equations",
            "named": true
          }
        ]
      },
      "kind": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "prefix_list",
            "named": true
          },
          {
            "type": "unit",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_params",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        },
        {
          "type": "type_family_injectivity",
          "named": true
        },
        {
          "type": "type_family_result",
          "named": true
        }
      ]
    }
  },
  "type_family_injectivity": {
    "type": "type_family_injectivity",
    "named": true,
    "fields": {
      "determined": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "variable",
            "named": true
          }
        ]
      },
      "result": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "variable",
            "named": true
          }
        ]
      }
    }
  },
  "type_family_result": {
    "type": "type_family_result",
    "named": true,
    "fields": {
      "result": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    }
  },
  "type_instance": {
    "type": "type_instance",
    "named": true,
    "fields": {
      "forall": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "forall",
            "named": true
          },
          {
            "type": "forall_required",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_patterns",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        },
        {
          "type": "quantified_type",
          "named": true
        }
      ]
    }
  },
  "type_params": {
    "type": "type_params",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "type_param",
          "named": true
        }
      ]
    }
  },
  "type_patterns": {
    "type": "type_patterns",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "kind_application",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "type_role": {
    "type": "type_role",
    "named": true,
    "fields": {}
  },
  "type_synomym": {
    "type": "type_synomym",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "name",
            "named": true
          },
          {
            "type": "prefix_id",
            "named": true
          },
          {
            "type": "prefix_list",
            "named": true
          },
          {
            "type": "unit",
            "named": true
          }
        ]
      },
      "patterns": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_params",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "infix",
          "named": true
        },
        {
          "type": "parens",
          "named": true
        }
      ]
    }
  },
  "typed_quote": {
    "type": "typed_quote",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "quoted_expression",
          "named": true
        }
      ]
    }
  },
  "unboxed_sum": {
    "type": "unboxed_sum",
    "named": true,
    "fields": {
      "element": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          },
          {
            "type": "view_pattern",
            "named": true
          }
        ]
      }
    }
  },
  "unboxed_tuple": {
    "type": "unboxed_tuple",
    "named": true,
    "fields": {
      "element": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "quantified_type",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          },
          {
            "type": "view_pattern",
            "named": true
          }
        ]
      }
    }
  },
  "unboxed_unit": {
    "type": "unboxed_unit",
    "named": true,
    "fields": {}
  },
  "unit": {
    "type": "unit",
    "named": true,
    "fields": {}
  },
  "via": {
    "type": "via",
    "named": true,
    "fields": {
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "quantified_type",
            "named": true
          }
        ]
      }
    }
  },
  "view_pattern": {
    "type": "view_pattern",
    "named": true,
    "fields": {
      "expression": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "expression",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          }
        ]
      },
      "pattern": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "pattern",
            "named": true
          },
          {
            "type": "signature",
            "named": true
          },
          {
            "type": "view_pattern",
            "named": true
          }
        ]
      }
    }
  },
  "wildcard": {
    "type": "wildcard",
    "named": true,
    "fields": {}
  },
  "all_names": {
    "type": "all_names",
    "named": true
  },
  "calling_convention": {
    "type": "calling_convention",
    "named": true
  },
  "char": {
    "type": "char",
    "named": true
  },
  "comment": {
    "type": "comment",
    "named": true
  },
  "constructor": {
    "type": "constructor",
    "named": true
  },
  "cpp": {
    "type": "cpp",
    "named": true
  },
  "float": {
    "type": "float",
    "named": true
  },
  "haddock": {
    "type": "haddock",
    "named": true
  },
  "implicit_variable": {
    "type": "implicit_variable",
    "named": true
  },
  "import_package": {
    "type": "import_package",
    "named": true
  },
  "label": {
    "type": "label",
    "named": true
  },
  "module_id": {
    "type": "module_id",
    "named": true
  },
  "name": {
    "type": "name",
    "named": true
  },
  "pragma": {
    "type": "pragma",
    "named": true
  },
  "quasiquote_body": {
    "type": "quasiquote_body",
    "named": true
  },
  "safety": {
    "type": "safety",
    "named": true
  },
  "string": {
    "type": "string",
    "named": true
  },
  "variable": {
    "type": "variable",
    "named": true
  }
};
export default HaskellTypes;