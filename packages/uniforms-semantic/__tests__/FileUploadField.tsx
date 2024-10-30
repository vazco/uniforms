import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUploadField } from 'uniforms-semantic';
import createContext from './_createContext';

describe('<FileUploadField> tests', () => {
  const context = createContext({
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
