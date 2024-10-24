const onSearch = () => {
    const input = document.getElementById('search');
    const filter = input.value.toUpperCase();

    const list = document.querySelectorAll('#list li');

    list.forEach((el) => {
        const text = el.textContent.toUpperCase();

        el.computedStyleMap.display = text.includes(filter) ? '' : 'none';
    });
};

/* <div class="container">
        <h1>Search List</h1>
        <input type="text" id="search" onkeyup="onSearch()" placeholder="Search items...">
        <ul id="list">
            <li>Apple</li>
            <li>Banana</li>
            <li>Orange</li>
            <li>Mango</li>
            <li>Grapes</li>
            <li>Strawberry</li>
            <li>Pineapple</li>
            <li>Watermelon</li>
        </ul>
    </div> */