---
id: 'why-are-uniforms'
title: Why are uniforms?
---

## Forms concept

There’s a very interesting class-based inheritance concept for forms.
Basically, there are a few types of forms with different capabilities.
Most of the time you’ll be using either AutoForm or ValidatedForm, but there are quite a few more to choose from:

<p align="center">
  <img src="/img/uniforms-graph.png" alt="Graph showing inheritance hierarchy of different forms." />
</p>

> **If you are not familiar with concept of HOC, read one of many posts about them first.**
> I’m sure you’ve read at least one of _Why ES6 classes are bad_ or _class considered harmful_ posts. I’ve read them too, so why is uniforms using classes? Well, it’s all about the complexity.
>
> -- <cite>[Radosław Miernik](https://github.com/radekmie)</cite>

<p align="center">
  <img src="/img/hoc-hell.png" alt="React DevTools when lots of HOC’s are applied to a component." />
</p>

> I wanted to achieve the same functionality as with multiple HOCs, but within one component. To be honest, readability is more important than performance. In short, I’ve reached (more or less) traits with ES6 classes. The result?
>
> -- <cite>[Radosław Miernik](https://github.com/radekmie)</cite>

```tsx
import BaseForm from './BaseForm';
import QuickForm from './QuickForm';
import ValidatedForm from './ValidatedForm';

const ValidatedQuickForm = ValidatedForm.Validated(QuickForm.Quick(BaseForm));
```

<p align="center">
  <img src="/img/uniforms-traits.png" alt='AutoValidatedQuickSemanticForm (using 5 "traits") viewed in React DevTools.' />
</p>

While it’s not a universal approach that will work in every situation, using it in uniforms allows us to deliver clean-looking components while keeping extensibility and separation of concerns.

<hr />

Based on [Managing forms in a Meteor/React project with the uniforms package](https://blog.meteor.com/managing-forms-in-a-meteor-react-project-with-uniforms-33d60602b43a) written by [Maciej Stasiełuk](https://github.com/MacRusher).
