export hello_coffee = (arg='anonymous') ->
  console.log "Hello from CoffeeScript! #{arg}!"

export addElement = ->
  for i in [0..99]
    div = document.createElement 'div'
    container = document.querySelector '#container'
    div.innerHTML = '<img src="../../assets/animal_yagi.png"></img>'
    container.insertAdjacentElement 'beforeend', div

