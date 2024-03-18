import React, {useState} from 'react';
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
} from 'semantic-ui-react';

function AddRemModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Add Reminder?</Button>}
    >
      <ModalHeader>Set Reminder</ModalHeader>
      <ModalContent>
        <ModalDescription>      
          <p>
            Would you like to set a reminder...
          </p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>
  )
}

export default AddRemModal

{/* <AddRemModal trigger={<Button>Content</Button>} /> */}