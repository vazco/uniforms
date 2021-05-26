---
id: examples-custom-form
title: Custom form
---

In uniforms, every form is just an injectable set of functionalities.
Thus, we can live without many higher order components, using composed ones instead.
If you want to get a deeper dive into it, we encourage you to read the source of AutoForm or QuickForm in the core package.

### `ModifierForm`

```tsx
import { BaseForm } from 'uniforms';

const Modifier = parent =>
  class extends parent {
    // Expose injector.
    //   It's not required, but recommended.
    static Modifier = Modifier;

    // Alter component display name.
    //   It's not required, but recommended.
    static displayName = `Modifier${parent.displayName}`;

    // Here you can override any form methods or create additional ones.
    getModel(mode) {
      if (mode === 'submit') {
        const doc = super.getModel('submit');
        const keys = this.getContextSchema().getSubfields();

        const update = keys.filter(key => doc[key] !== undefined);
        const remove = keys.filter(key => doc[key] === undefined);

        // It's a good idea to omit empty modifiers.
        const $set = update.reduce(
          (acc, key) => ({ ...acc, [key]: doc[key] }),
          {}
        );
        const $unset = remove.reduce((acc, key) => ({ ...acc, [key]: '' }), {});

        return { $set, $unset };
      }

      return super.getModel(mode);
    }
  };

// Now we have to inject our functionality. This one is a ModifierForm. Use any
// form component you want.
const ModifierForm = Modifier(BaseForm);
```
