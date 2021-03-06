class Api::SearchesController < ApplicationController
  def index
    render json: ['Requires search input'], status: 422 if params[:query].empty?

    @playlists = Playlist.where("lower(name) ~* ?", query_string).sort_by{ |playlist| match_weight(playlist.name) }.reverse
    # @playlists = Playlist.where("lower(name) ~* ?", params[:query])

    @albums = Album.where("lower(title) ~* ?", query_string).sort_by{ |album| match_weight(album.title) }.reverse
    # @albums = Album.where("lower(title) ~* ?", params[:query])

    @artists = Artist.includes(:songs, :albums).where("lower(name) ~* ?", query_string).sort_by{ |artist| match_weight(artist.name) }.reverse
    # @artists = Artist.where("lower(name) ~* ?", params[:query])

    # @songs = Song.where("lower(songs.title) ~* ? OR lower(artists.name) ~* ?", query_string).sort_by{ |song| match_weight(song.title) }.reverse
    @songs = Song.where("lower(title) ~* ?", query_string).sort_by{ |song| match_weight(song.title) }.reverse
    # @songs = Song.where("lower(title) ~* ?", params[:query])

    
    @artists.each do |artist|
      @songs += artist.songs
    end

    @artists.each do |artist|
      @albums += artist.albums 
    end

  end

  private

  def query_string
    "^#{params[:query].downcase}|\s#{params[:query].downcase}"
  end

  def match_weight(obj)
    obj.downcase.scan(Regexp.new(params[:query])).count
  end
end

