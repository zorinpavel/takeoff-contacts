export default (contacts, { text, sortBy }) => {
    return contacts.filter(contact => {
        const textMatch = text ? contact.description.toLowerCase().includes(text.toLowerCase()) : true;

        return textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};
