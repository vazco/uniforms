---
id: compare-matrix
title: Comparison matrix
---

|                                                             Feature | [uniforms](https://github.com/vazco/uniforms) | [Formik](https://github.com/jaredpalmer/formik) | [redux-form](https://github.com/erikras/redux-form) | [React Final Form](https://github.com/final-form/react-final-form) | [react-hook-form](https://github.com/react-hook-form/react-hook-form) | [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) |
| ------------------------------------------------------------------: | :-------------------------------------------: | :---------------------------------------------: | :-------------------------------------------------: | :----------------------------------------------------------------: | :-------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
|                   [Synchronous validation](#synchronous-validation) |              :heavy_check_mark:               |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                          :heavy_check_mark:                           |                             :heavy_check_mark:                              |
|                 [Asynchronous validation](#asynchronous-validation) |              :heavy_check_mark:               |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                          :heavy_check_mark:                           |                           :heavy_check_mark:[^1]                            |
|                   [Field level validation](#field-level-validation) |           :heavy_multiplication_x:            |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                          :heavy_check_mark:                           |                          :heavy_multiplication_x:                           |
|                           [Manual form layout](#manual-form-layout) |              :heavy_check_mark:               |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                          :heavy_check_mark:                           |                          :heavy_multiplication_x:                           |
|                     [Automatic form layout](#automatic-form-layout) |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|       [Manual state management mode](#manual-state-management-mode) |              :heavy_check_mark:               |            :heavy_multiplication_x:             |                 :heavy_check_mark:                  |                      :heavy_multiplication_x:                      |                          :heavy_check_mark:                           |                             :heavy_check_mark:                              |
| [Automatic state management mode](#automatic-state-management-mode) |              :heavy_check_mark:               |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                          :heavy_check_mark:                           |                             :heavy_check_mark:                              |
|                 [Manually trigger change](#manually-trigger-change) |              :heavy_check_mark:               |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                          :heavy_check_mark:                           |                             :heavy_check_mark:                              |
|                   [Manually trigger reset](#manually-trigger-reset) |              :heavy_check_mark:               |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                      :heavy_multiplication_x:                      |                          :heavy_check_mark:                           |                             :heavy_check_mark:                              |
|         [Manually trigger validation](#manually-trigger-validation) |              :heavy_check_mark:               |               :heavy_check_mark:                |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                          :heavy_check_mark:                           |                             :heavy_check_mark:                              |
| [Built in focus state management](#built-in-focus-state-management) |           :heavy_multiplication_x:            |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                          :heavy_check_mark:                           |                             :heavy_check_mark:                              |
|                                                    Ant Design theme |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                   Bootstrap 3 theme |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                   Bootstrap 4 theme |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                   Bootstrap 5 theme |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                          :heavy_multiplication_x:                           |
|                                                     Chakra UI theme |           :heavy_multiplication_x:            |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                     Fluent UI theme |           :heavy_multiplication_x:            |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                   Semantic UI theme |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                      Material theme |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                           MUI theme |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                   Your custom theme |              :heavy_check_mark:               |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                                 JSON Schema support |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                             :heavy_check_mark:                              |
|                                              GraphQL schema support |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                          :heavy_multiplication_x:                           |
|                                                SimpleSchema support |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                          :heavy_multiplication_x:                           |
|                                                  Zod schema support |              :heavy_check_mark:               |            :heavy_multiplication_x:             |              :heavy_multiplication_x:               |                      :heavy_multiplication_x:                      |                       :heavy_multiplication_x:                        |                          :heavy_multiplication_x:                           |
|                                          Your custom schema support |              :heavy_check_mark:               |               :heavy_check_mark:                |                 :heavy_check_mark:                  |                         :heavy_check_mark:                         |                       :heavy_multiplication_x:                        |                          :heavy_multiplication_x:                           |

### Feature descriptions

#### Synchronous validation

This type of validation checks user input immediately as it is entered in a form field.

#### Asynchronous validation

This type of validation checks user input after it has been submitted.

#### Field-level validation

Refers to the process of validating individual form fields against predefined rules or requirements.

#### Manual form layout

Allows the structure of form elements to be defined manually.

#### Automatic form layout

Allows autogenerating the structure of form elements depending on a provided schema.

#### Manual state management mode

The ability to manually control and update the state or values of form elements (such as input fields, checkboxes, or radio buttons).

#### Automatic state management mode

Automatically manage the state or values of form elements (such as input fields, checkboxes, or radio buttons) without requiring explicit manual updates by developers.

#### Manually trigger change

Allows to initiate changes of form values manually.

#### Manually trigger reset

Allows to reset form values manually.

#### Manually trigger validation

Allows to validate form values manually.

#### Built in focus state management

Automatically manage the visual state of form elements when they are focused or blurred (i.e., when the user clicks on or navigates away from an element).

[^1]: There's no built-in flow for that, but you can handle it yourself and pass it to the display.
