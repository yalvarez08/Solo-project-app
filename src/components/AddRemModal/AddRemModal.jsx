import React, {useState} from 'react';
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';

function AddRemModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon><Icon name="bell" /></Button>}
    >
      <ModalHeader>Set Reminder</ModalHeader>
      <ModalContent>
        <ModalDescription>      
          <p>
            Would you like to set a reminder for this maintenance item?
          </p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color='black' onClick={() => setOpen(false)}>
          No thanks.
        </Button>
        <Button
          content="Yes!"
          labelPosition='right'
          icon='checkmark'
          color="olive"
          onClick={() => setOpen(false)}
        />
      </ModalActions>
    </Modal>
  )
}

export default AddRemModal

