---
id: bridges-simple-schema-2
title: SimpleSchema2
---

**Note:** remember to import `uniforms-bridge-simple-schema-2` first.

```js
import SimpleSchema from 'simpl-schema';

const PersonSchema = new SimpleSchema({
  // ...

  aboutMe: {
    type: String,
    uniforms: MyText, // Component...
    uniforms: {
      // ...or object...
      component: MyText, // ...with component...
      propA: 1 // ...and/or extra props.
    }
  }
});
```
