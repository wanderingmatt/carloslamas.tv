#
# Methods placed in this module can be used inside of any view.
# View helpers allow you to encapsalate complex logic and keep your
# views pristine.
#
module ViewHelpers
  
  # Calculate the years for a copyright
  def copyright_years(start_year)
    end_year = Date.today.year
    if start_year == end_year
      "\#{start_year}"
    else
      "\#{start_year}&#8211;\#{end_year}"
    end
  end
  
  # Handy for hiding a block of unfinished code
  def hidden(&block)
    #no-op
  end
end

module ContentHelpers
  def content_for(symbol, content = nil, &block)
    content = capture(&block) if block_given?
    set_content_for(symbol, content) if content
    get_content_for(symbol) unless content
  end
  
  def content_for?(symbol)
    !(get_content_for(symbol)).nil?
  end
  
  def get_content_for(symbol = :content)
    if symbol.to_s.intern == :content
      @content
    else
      instance_variable_get("@content_for_#{symbol}")
    end
  end
  
  def set_content_for(symbol, value)
    instance_variable_set("@content_for_#{symbol}", value)
  end
  
  def capture_erb(&block)
    buffer = ""
    old_buffer, @_out_buf = @_out_buf, buffer
    yield
    buffer
  ensure
    @_out_buf = old_buffer
  end
  alias capture_rhtml capture_erb
  alias capture_erubis capture_erb
  
  def capture(&block)
    capture_method = "capture_#{script_extension}"
    if respond_to? capture_method
      send capture_method, &block
    else
      raise "Capture not supported for `#{script_extension}' template (#{engine_name})"
    end
  end
  
  private
    
    def engine_name
      Tilt[script_extension].to_s
    end
    
    def script_extension
      parser.script_extension
    end
end