json.array!(@fblogs) do |fblog|
  json.extract! fblog, :id, :title
  json.url fblog_url(fblog, format: :json)
end
