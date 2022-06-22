import React from 'react';
import { Button, CodeEditor, Drawer, InlineField, InlineFieldRow } from '@grafana/ui';
import { TargetState } from '@volkovlabs/volkovlabs-balenasupervisor-datasource';

/**
 * State Drawer
 */
export const StateDrawer = ({ targetState, onClose }: { targetState: TargetState; onClose: any }) => {
  /**
   * Return
   */
  return (
    <Drawer
      title="Target State"
      subtitle="Please verify state configuration and update if required."
      width="50%"
      onClose={onClose}
    >
      <InlineFieldRow>
        <InlineField grow>
          <CodeEditor
            value={JSON.stringify(targetState, null, 2) || '{}'}
            language="Javascript"
            height="1000px"
            showLineNumbers
            showMiniMap
          ></CodeEditor>
        </InlineField>
      </InlineFieldRow>

      <Button
        variant="secondary"
        onClick={() => {
          onClose();
        }}
      >
        Close
      </Button>
    </Drawer>
  );
};
