import React from 'react';
import { toBeEmptyDOMElement } from '@testing-library/jest-dom/matchers';
import { UploadImagesSection } from '../components/UploadImagesSection';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { storage } from '../firebase';

expect.extend({ toBeEmptyDOMElement });

jest.mock('../firebase', () => ({
  storage: {
    ref: jest.fn(() => ({
      child: jest.fn(() => ({
        put: jest.fn(() => ({
          on: jest.fn(),
        })),
      })),
    })),
  },
}));
beforeEach(cleanup);

describe('<UploadImagesSection/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Component renders', () => {
    const { queryByTestId, queryByText } = render(<UploadImagesSection />);

    expect(queryByTestId('upload-action')).toBeTruthy();
    expect(queryByText('Upload Images')).toBeTruthy();
    expect(
      queryByText('Upload up to 3 clear images of your property.')
    ).toBeTruthy();
  });

  it('Upload button accepts a click action', () => {
    const { queryByTestId } = render(<UploadImagesSection imageUrls={[]} />);

    const uploadButton = queryByTestId('upload-action');

    fireEvent.click(uploadButton);
  });

  it('The component can upload files', () => {
    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();
    const setImageUrls = jest.fn();
    const { queryByTestId } = render(
      <UploadImagesSection
        imageUrls={[]}
        setImageUrls={setImageUrls}
        hasSubmitted={false}
        isEditing={false}
      />
    );

    const uploadInput = queryByTestId('upload-input');

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    fireEvent.change(uploadInput, { target: { files: [file] } });
  });

  it('When a user submits the form the preview images are removed from the document', () => {
    const { queryByTestId } = render(
      <UploadImagesSection hasSubmitted={true} imageUrls={[]} />
    );

    expect(
      screen.queryByTestId('preview-images-wrapper')
    ).toBeEmptyDOMElement();
  });
});
