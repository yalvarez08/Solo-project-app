import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  ModalDescription,
  ModalContent,
  ModalActions,
  Header,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';

function AddRemModal() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {id} = useParams();
  const item = useSelector(store => store.item);

  
  const handleYes = () => {
    history.push(`/add-reminder`);
  }

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon><Icon name="bell" /></Button>}
    >
      <Header icon='bell outline' content='Set Reminder' />
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
          onClick={handleYes}
        />
      </ModalActions>
    </Modal>
  )
}

export default AddRemModal

