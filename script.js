document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addItemForm');
    const itemList = document.getElementById('itemList');
    const baseUrl = 'https://crudcrud.com/api/c0c2e7ff13614b91b3e7b99f9190f33b/details';
  
    // Fetch all items on page load
    fetchItems();
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const itemId = document.getElementById('itemId').value;
      const itemName = document.getElementById('itemName').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const quantity = document.getElementById('quantity').value;
  
      const newItem = {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity
      };
  
      if (itemId) {
        // Update an existing item
        updateItem(itemId, newItem);
      } else {
        // Create a new item
        createItem(newItem);
      }
    });
  
    function fetchItems() {
      axios.get(baseUrl)
        .then(response => {
          displayItems(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    function displayItems(items) {
      itemList.innerHTML = '';
  
      items.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.itemName} - ${item.description} - RS:${item.price} - Quantity: ${item.quantity}`;
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className='btn btn-warning'
        editButton.addEventListener('click', function() {
          editItem(item);
        });
        itemElement.appendChild(editButton);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className='btn btn-danger'
        deleteButton.addEventListener('click', function() {
          deleteItem(item._id);
        });
        itemElement.appendChild(deleteButton);
  
        itemList.appendChild(itemElement);
      });
    }
  
    function createItem(item) {
      axios.post(baseUrl, item)
        .then(response => {
          fetchItems();
          clearForm();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    function updateItem(itemId, item) {
      axios.put(`${baseUrl}/${itemId}`, item)
        .then(response => {
          fetchItems();
          clearForm();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    function deleteItem(itemId) {
      axios.delete(`${baseUrl}/${itemId}`)
        .then(response => {
          fetchItems();
          clearForm();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    function editItem(item) {
      document.getElementById('itemId').value = item._id;
      document.getElementById('itemName').value = item.itemName;
      document.getElementById('description').value = item.description;
      document.getElementById('price').value = item.price;
      document.getElementById('quantity').value = item.quantity;
    }
  
    function clearForm() {
      document.getElementById('itemId').value = '';
      document.getElementById('itemName').value = '';
      document.getElementById('description').value = '';
      document.getElementById('price').value = '';
      document.getElementById('quantity').value = '';
    }
  });