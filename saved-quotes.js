

const content = getQuotes();
setQuotes(content);

function getQuotes() {
    return JSON.parse(localStorage.getItem('quotes')) || [];
}

function setQuotes(quotes = []) {
    const quotesWrapper = document.querySelector('.saved-quotes-wrapper');
    quotesWrapper.innerHTML = '';
    if (quotes.length) {
        if ('content' in document.createElement('template')) {
            quotes.forEach(({id, quote, author}) => {
                const clone = document.querySelector('#saved-quote-component').content.cloneNode(true);
                clone.querySelector('span').innerText = id;
                clone.querySelector('p').innerText = quote;
                clone.querySelector('div').innerText = author;
                quotesWrapper.appendChild(clone);
            });
        } else {
            alert("Please use latest browsers.")
        }
    }
}

function deleteQuote(button) {
    const id = button.parentElement.querySelector('span').innerText;
    let quotes = getQuotes();
    if (confirm("Are you sure to delete this quote?") && quotes.length) {
        quotes = quotes.filter(item => item.id !== id);
        try {
            localStorage.setItem('quotes', JSON.stringify(quotes));
            alert("Quote deleted!");
            const content = getQuotes();
            setQuotes(content);
        } catch (error) {
            alert(error.message);
        }
    }

}