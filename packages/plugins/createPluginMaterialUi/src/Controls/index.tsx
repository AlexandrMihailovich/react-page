import React, { useState, useCallback } from 'react';
import { ControlProps } from '../types';

import { AutoForm, AutoFields } from 'uniforms-material';
import debounce from 'lodash.debounce';
import { BottomToolbar } from 'react-page-nm-ui';
import makeUniformsSchema from '../utils/makeUniformsSchema';

function Controls<T>(props: ControlProps<T>) {
  const saveDebounced = useCallback(
    debounce((m: T) => props.onChange(m), 1000),
    [props.onChange]
  );

  const [preview, setPreview] = useState();

  const onSubmit = (model: T) => {
    setPreview(model);
    saveDebounced(model);
  };

  const { focused, state, schema, Renderer } = props;

  return (
    <>
      <Renderer {...props} state={preview || state} />

      <BottomToolbar open={focused}>
        <AutoForm
          model={preview || state}
          autosave={true}
          schema={makeUniformsSchema<T>(schema)}
          onSubmit={onSubmit}
        >
          <AutoFields />
        </AutoForm>
      </BottomToolbar>
    </>
  );
}

export default Controls;
