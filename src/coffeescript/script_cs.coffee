export draw_doors = (a_doors) ->
  container = document.querySelector '#container'
  for d in a_doors
    container.insertAdjacentElement 'beforeend', d.get_dom()

export update_message = (a_message, a_replace=false) ->
  message_area = document.querySelector '#message'
  if a_replace
    message_area.innerHTML = a_message
  else
    message_area.innerHTML += a_message
