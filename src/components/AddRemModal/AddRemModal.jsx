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
  const [secondOpen, setSecondOpen] = useState(false);

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
          icon='right chevron'
          color="olive"
          onClick={() => setSecondOpen(true)}
        />
      </ModalActions>

      <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='small'
        >
          <ModalHeader>Modal #2</ModalHeader>
          <ModalContent>
            <p>That's everything!</p>
          </ModalContent>
          <ModalActions>
            <Button
              icon='check'
              content='All Done'
              onClick={() => setSecondOpen(false)}
            />
          </ModalActions>
        </Modal>
    </Modal>
  )
}

export default AddRemModal

