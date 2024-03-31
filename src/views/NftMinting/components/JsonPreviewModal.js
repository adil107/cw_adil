import { Button, Dialog } from "components/ui";
import React from "react";
import ReactJson from "react-json-view";

import "./style.css";
import { openNotification } from "utils/notification";
import { copyToClipBoard } from "utils/helper";

const JsonPreviewModal = ({ isOpen, onClose, meteJson }) => {

  const handleCopy = (copyText) => {
    copyToClipBoard(copyText).then((status) => {
      if (status) {
        openNotification("success", "Successfully Copied");
        // setLoading(false);
        setTimeout(()=>{
          onClose?.()
        },500)
      }
    });
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onClose}
        bodyOpenClassName="overflow-hidden"
        width={620}
      >
        <div className="">
          <h3 className="mb-2">Metadata JSON</h3>
          <ReactJson
            src={meteJson}
            theme="monokai"
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
          />
        </div>
        <div className="flex justify-end w-full mt-4">
          <Button className="ltr:mr-2 rtl:ml-2" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            variant="solid"
            onClick={() => {
              handleCopy(JSON.stringify(meteJson));
            }}
            type="button"
          >
            Copy
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default JsonPreviewModal;
