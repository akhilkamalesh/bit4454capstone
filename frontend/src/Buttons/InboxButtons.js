const InboxButtons = ({ onSelectCategory, selectedCategory }) => {
    return (
        <div>
            <button className={selectedCategory === 'inbox' ? 'selected' : 'btn-dark'} onClick={() => onSelectCategory('inbox')}>Inbox</button>
            <button className={selectedCategory === 'sent' ? 'selected' : 'btn-dark'} onClick={() => onSelectCategory('sent')}>Sent</button>
            <button className={selectedCategory === 'starred' ? 'selected' : 'btn-dark'} onClick={() => onSelectCategory('starred')}>Starred</button>
            <button className={selectedCategory === 'drafts' ? 'selected' : 'btn-dark'} onClick={() => onSelectCategory('drafts')}>Drafts</button>
        </div>
    );
};

export default InboxButtons;