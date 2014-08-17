# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  $('a[rel=tooltip]').tooltip 'placement': 'bottom'

# facebook like
((d, s, id) ->
    js = undefined
    fjs = d.getElementsByTagName(s)[0]
    return  if d.getElementById(id)
    js = d.createElement(s)
    js.id = id
    js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&appId=264193273740912&version=v2.0"
    fjs.parentNode.insertBefore js, fjs
    return
) document, "script", "facebook-jssdk"
