import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FileUploadField as AntdFileUploadField } from 'uniforms-antd';
import { FileUploadField as Bootstrap4FileUploadField } from 'uniforms-bootstrap4';
import { FileUploadField as Bootstrap5FileUploadField } from 'uniforms-bootstrap5';
import { FileUploadField as MuiFileUploadField } from 'uniforms-mui';
import { FileUploadField as SemanticFileUploadField } from 'uniforms-semantic';
import { FileUploadField as UnstyledFileUploadField } from 'uniforms-unstyled';
import { z } from 'zod';
import { renderWithZod } from 'uniforms/__suites__';

const testCases = [
  { name: 'Ant Design', component: AntdFileUploadField, uploadText: 'Click to Upload' },
  { name: 'Bootstrap 4', component: Bootstrap4FileUploadField, uploadText: 'Choose files' },
  { name: 'Bootstrap 5', component: Bootstrap5FileUploadField, uploadText: 'Choose files' },
  { name: 'Material-UI', component: MuiFileUploadField, uploadText: 'Upload' },
  { name: 'Semantic UI', component: SemanticFileUploadField, uploadText: 'Upload' },
  { name: 'Unstyled', component: UnstyledFileUploadField, uploadText: 'Drag and drop files here, or click to select files' },
];

describe('@RTL - FileUploadField tests', () => {
  testCases.forEach(({ name, component: FileUploadField, uploadText }) => {
    describe(`${name} theme`, () => {
      test('<FileUploadField> - renders an upload button', () => {
        renderWithZod({
          element: <FileUploadField name="x" />,
          schema: z.object({ x: z.instanceof(File).array() }),
        });

        expect(screen.getByText(uploadText)).toBeInTheDocument();
      });

      test('<FileUploadField> - uploads a file and displays it in the list', () => {
        const file = new File(['file content'], 'file.txt', { type: 'text/plain' });

        renderWithZod({
          element: <FileUploadField name="x" />,
          schema: z.object({ x: z.instanceof(File).array() }),
        });

        const input = screen.getByText(uploadText).closest('input');
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
  });
});
