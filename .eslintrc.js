module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        // 'quotes': [
        //     'error',
        //     'single'
        // ],
        'semi': [
            'error',
            'never'
        ]
    }
}


// marked here for our way of writting out contract 
// npx eslint 01_index.js
// make an .eslintignore to ignore the dist folder
// there is eslint plugin also

// {
//     // ...
//     'rules': {
//       // ...
//       'eqeqeq': 'error',
//       'no-trailing-spaces': 'error',
//       'object-curly-spacing': [
//           'error', 'always'
//       ],
//       'arrow-spacing': [
//           'error', { 'before': true, 'after': true }
//       ]
//     },
//   }copy
  

// disabling an colosole log command rule by
//     'no-console': 0
