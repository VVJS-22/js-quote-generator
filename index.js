const getQuote = async () => {
    setLoadingState();
    try {
        const res = await fetch('https://dummyjson.com/quotes/random');
        const {id, quote, author} = await res.json();

        const quoteWrapper = document.querySelector("#js_quote_wrapper");
        const quoteContainer = quoteWrapper.querySelector("#js_quote");
        const authorContainer = quoteWrapper.querySelector("#js_author");

        quoteWrapper.dataset.id = id;
        quoteContainer.textContent = quote;
        authorContainer.textContent = author;
        removeLoadingState();
    } catch (error) {
        removeLoadingState();
        setError(error.message);
    }
}

function setLoadingState() {
    const loader = document.querySelector("#js_loader");
    const buttons = document.querySelectorAll(".js_btn");
    const quoteWrapper = document.querySelector("#js_quote_div");
    const errorContainer = document.querySelector('#js_error');

    errorContainer.textContent = '';
    loader.classList.remove('hide');
    quoteWrapper.classList.add('hide');
    buttons.forEach(child => {
        child.disabled = true;
    })
}

function removeLoadingState() {
    const loader = document.querySelector("#js_loader");
    const buttons = document.querySelectorAll(".js_btn");
    const quoteWrapper = document.querySelector("#js_quote_div");

    loader.classList.add('hide');
    quoteWrapper.classList.remove('hide');
    buttons.forEach(child => {
        child.disabled = false;
    })
}

function setError(error) {
    const errorContainer = document.querySelector('#js_error');
    errorContainer.textContent = error;
}

function saveQuote() {
    const id = document.querySelector("#js_quote_wrapper").dataset.id;
    const quote = document.querySelector("#js_quote").textContent;
    const author = document.querySelector("#js_author").textContent;

    let savedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    let alreadyExist;

    savedQuotes.forEach(({id: quoteId}) => {
        if (quoteId === id) {
            alreadyExist = true;
            return;
        }
    })
    
    if (!alreadyExist) {
        const canSave = confirm("Are you sure to save this quote?");
        if (canSave) {
        savedQuotes.push({id, quote, author});
        let json = JSON.stringify(savedQuotes);
        localStorage.setItem('quotes', json);
        }
    } else {
        alert("This quote is already saved");
    }
}

getQuote();

