import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUploadField } from 'uniforms-mui';
import { createSchema } from './_createSchema';
import { createContext } from './_createContext';

describe('<FileUploadField> tests', () => {
  const schema = createSchema({
    file: {
      type: Array,
      uniforms: {
        component: FileUploadField,
      },
    },
    'file.$': {
      type: Object,
    },
  });

  const context = createContext(schema);

  test('renders without crashing', () => {
    render(<FileUploadField name="file" />, { context });
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  test('uploads files', () => {
    render(<FileUploadField name="file" />, { context });
    const input = screen.getByLabelText('Upload');
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });

    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('file.txt')).toBeInTheDocument();
  });

  test('removes files', () => {
    render(<FileUploadField name="file" />, { context });
    const input = screen.getByLabelText('Upload');
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });

    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('file.txt')).toBeInTheDocument();

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);
    expect(screen.queryByText('file.txt')).not.toBeInTheDocument();
  });
});
