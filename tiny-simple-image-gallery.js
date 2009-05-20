var THUMBNAIL_WIDTH = 128
var THUMBNAIL_HEIGHT = 128

    var root_dir = ""
    var thumbnail_dir = ""
    var images_dir = ""
function build_gallery(xml_file, thumbnail_id, image_id, caption_id, tn_width, tn_height)
{
    if(!tn_width)
        tn_width = THUMBNAIL_WIDTH;
    if(!tn_height)
        tn_height = THUMBNAIL_HEIGHT;
    gallery = $(document).find('#'+thumbnail_id)
    // load xml
    $.ajax( { type: "GET", url: xml_file, dataType: "xml",
            success: function(xml) {
                // parse config
                config = $(xml).find('config')
                root_dir = config.find('root').text()
                thumbnail_dir = config.find('thumbnails').text()
                images_dir = config.find('images').text()
                // parse images
                $(xml).find('image').each( function() {
                    item = $(this)
                    filename = item.find('filename').text()
                    description = item.find('description').text()
                    thumbnail = item.find('thumbnail').text()
                    node = document.createElement('span')
                    img = document.createElement('img')
                    link = document.createElement('a')
                    link.setAttribute('href', filename)
                    // is thumbnail defined in xml file?
                    if(thumbnail)
                    {
                        img.setAttribute('src', root_dir + thumbnail_dir + thumbnail)
                    }
                    else
                    {
                        // no, we have to scale image down for thumbnail
                        img.setAttribute('src', root_dir + images_dir + filename)
                        img.setAttribute('width', tn_width)
                        img.setAttribute('height', tn_height)
                    }
                    // is description defined in xml?
                    if(description)
                    {
                        img.setAttribute('alt', description)
                        link.setAttribute('title', description)
                    }
                    // create DOM
                    link.appendChild(img)
                    node.appendChild(link)
                    gallery.append(node)
                    $(link).click( function() {
                        console.log($(this))
                        show_image(image_id, $(this).attr('href'), $(this).attr('title'))
                        return false;
                    });
                });

            },
            error: function(xml, text, error) {
                $(document).html('error during XML parsing')
            }
            }
   )
}

function show_image(image_id, img, alt)
{
    console.log(img)
    node = $('#'+image_id)
    node.empty()
    image = document.createElement('img')
    $(image).attr('src', root_dir + images_dir + img)
    desc = document.createElement('p')
    desc.appendChild( document.createTextNode(alt) )
    node.append(image)
    node.append(desc)
    
}
