require "sinatra"
require "dotenv"

Dotenv.load

set :public_folder, Proc.new { File.join(root, "public") }

get "/" do
  @name = ENV["NAME"]
  @full_name = ENV["FULL_NAME"]
  @twitter = ENV["TWITTER"]
  @last_cigarette = ENV["LAST_CIGARETTE"]
  @daily_cost = ENV["DAILY_COST"]
  @currency = ENV["CURRENCY"]
  erb :index
end
