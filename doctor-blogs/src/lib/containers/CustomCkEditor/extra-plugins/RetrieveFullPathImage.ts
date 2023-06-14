export default function RetrieveFullPathImage(getFile) {
  return function (editor) {
    editor.conversion.for('downcast').add((dispatcher) => {
      dispatcher.on('attribute:src:imageBlock', (evt, data, conversionApi) => {
        const viewWriter = conversionApi.writer;
        const viewFigure = conversionApi.mapper.toViewElement(data.item);
        const viewImage = viewFigure.getChild(0);

        getFile({ subPath: data.attributeNewValue })
          .then(({ data: dataImage }) => {
            return new Promise((resolve, _) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(dataImage);
            });
          })
          .then((base64Url) => {
            viewWriter.setAttribute('src', base64Url, viewImage);
          });
      });
    });

    editor.conversion.for('downcast').add((dispatcher) => {
      dispatcher.on('attribute:data-src:imageBlock', (evt, data, conversionApi) => {
        const viewWriter = conversionApi.writer;
        const viewFigure = conversionApi.mapper.toViewElement(data.item);
        const viewImage = viewFigure.getChild(0);

        viewWriter.setAttribute('data-src', data.attributeNewValue, viewImage);
      });
    });
  };
}
