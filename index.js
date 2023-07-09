const getQuote = async () => {
    setLoadingState();
    try {
        const res = await fetch('https://api.quotable.io/random');
        const {_id: id, content: quote , author} = await res.json();

        const quoteWrapper = document.querySelector("#js_quote_wrapper");
        const quoteContainer = quoteWrapper.querySelector("#js_quote");
        const authorContainer = quoteWrapper.querySelector("#js_author");

        quoteWrapper.dataset.id = id;
        quoteContainer.textContent = quote;
        authorContainer.textContent = author;
    } catch (error) {
        setError(error.message);
    } finally {
        removeLoadingState();
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
    let alreadyExist = savedQuotes.some(({id: quoteId}) => quoteId === id)
    
    if (!alreadyExist) {
        const canSave = confirm("Are you sure to save this quote?");
        if (canSave) {
        savedQuotes.push({id, quote, author});
        let json = JSON.stringify(savedQuotes);
        try {
            localStorage.setItem('quotes', json);
        } catch (error) {
            alert(error.message);
        }
        }
    } else {
        alert("This quote is already saved");
    }
}

getQuote();

