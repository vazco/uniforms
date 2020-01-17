const schema = {
  type: 'object',
  properties: {
    a: {
      type: 'number',
      title: 'a',
      uniforms: {
        title: 'Horse'
      }
    },
    b: {
      type: 'string',
      uniforms: {
        placeholder: 'Horse',
        required: false
      }
    },
    c: {
      type: 'string',
      title: 'Title',
      uniforms: {
        label: 'Horse'
      }
    },
    d: {
      type: 'string'
    },
    e: {
      type: 'string',
      title: 'Title',
      uniforms: {
        label: 'Horse A',
        placeholder: 'Horse B'
      }
    }
  },
  required: ['b', 'c', 'd', 'e']
};

export default schema;
