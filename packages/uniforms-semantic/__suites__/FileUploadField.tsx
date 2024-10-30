import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FileUploadField } from 'uniforms-semantic';
import { z } from 'zod';
import { renderWithZod } from 'uniforms/__suites__';

describe('@RTL - FileUploadField tests', () => {
  test('<FileUploadField> - renders an upload button', () => {
    renderWithZod({
      element: <FileUploadField name="x" />,
      schema: z.object({ x: z.instanceof(File).array() }),
    });

    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  test('<FileUploadField> - uploads a file and displays it in the list', () => {
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });

    renderWithZod({
      element: <FileUploadField name="x" />,
      schema: z.object({ x: z.instanceof(File).array() }),
    });

    const input = screen.getByText('Upload').closest('input');
    fireEvent.change(input!, { target: { files: [file] } });

    expect(screen.getByText('file.txt')).toBeInTheDocument();
  });

  test('<FileUploadField> - removes a file from the list', () => {
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });

    renderWithZod({
      element: <FileUploadField name="x" value={[file]} />,
      schema: z.object({ x: z.instanceof(File).array() }),
    });

    expect(screen.getByText('file.txt')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    expect(screen.queryByText('file.txt')).not.toBeInTheDocument();
  });
});
