# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

# $ ->
#   $('textarea.wmd-input').each (i, input) ->
#     attr = $(input).attr('id').split('wmd-input')[1]
#     converter = new Markdown.Converter()
#     Markdown.Extra.init(converter)
#     help =
#       handler: () ->
#         window.open('http://daringfireball.net/projects/markdown/syntax')
#         return false
#       title: "<%= I18n.t('components.markdown_editor.help', default: 'Markdown Editing Help') %>"
#     editor = new Markdown.Editor(converter, attr, help)
#     editor.run()