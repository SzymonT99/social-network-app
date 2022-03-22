const styles = (theme) => ({
  chatContainer: {
    margin: '20px 0px',
    display: 'flex',
    height: '90%',
    backgroundColor: 'white',
  },
  conversationsContainer: {
    padding: '10px',
    border: '1px solid #000',
    borderRightWidth: 0,
    flex: 2,
  },
  chatMessagesContainer: {
    padding: '10px',
    border: '1px solid #000',
    flex: 6,
    borderRightWidth: 0,
    height: '100%',
  },
  chatMembersContainer: {
    padding: '10px',
    border: '1px solid #000',
    flex: 2,
  },
});

export default styles;
