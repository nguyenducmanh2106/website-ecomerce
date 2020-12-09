/*!
 * Variations Plugin
 */
!function(a,b,c,d){a.fn.wc_variation_form=function(){var c=this,d=c.find(".single_variation"),f=c.closest(".product"),g=parseInt(c.data("product_id"),10),h=c.data("product_variations"),i=h===!1,j=!1,k=c.find(".reset_variations"),l=wp.template("variation-template"),m=wp.template("unavailable-variation-template"),n=c.find(".single_variation_wrap");return n.show(),c.unbind("check_variations update_variation_values found_variation"),c.find(".reset_variations").unbind("click"),c.find(".variations select").unbind("change focusin"),c.on("click",".reset_variations",function(a){a.preventDefault(),c.find(".variations select").val("").change(),c.trigger("reset_data")}).on("hide_variation",function(a){a.preventDefault(),c.find(".single_add_to_cart_button").removeClass("wc-variation-is-unavailable").addClass("disabled wc-variation-selection-needed"),c.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-enabled").addClass("woocommerce-variation-add-to-cart-disabled")}).on("show_variation",function(a,b,d){a.preventDefault(),d?(c.find(".single_add_to_cart_button").removeClass("disabled wc-variation-selection-needed wc-variation-is-unavailable"),c.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-disabled").addClass("woocommerce-variation-add-to-cart-enabled")):(c.find(".single_add_to_cart_button").removeClass("wc-variation-selection-needed").addClass("disabled wc-variation-is-unavailable"),c.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-enabled").addClass("woocommerce-variation-add-to-cart-disabled"))}).on("click",".single_add_to_cart_button",function(c){var d=a(this);d.is(".disabled")&&(c.preventDefault(),d.is(".wc-variation-is-unavailable")?b.alert(wc_add_to_cart_variation_params.i18n_unavailable_text):d.is(".wc-variation-selection-needed")&&b.alert(wc_add_to_cart_variation_params.i18n_make_a_selection_text))}).on("reload_product_variations",function(){h=c.data("product_variations"),i=h===!1}).on("reset_data",function(){f.find(".product_meta").find(".sku").wc_reset_content(),a(".product_weight").wc_reset_content(),a(".product_dimensions").wc_reset_content(),c.trigger("reset_image"),d.slideUp(200).trigger("hide_variation")}).on("reset_image",function(){c.wc_variations_image_update(!1)}).on("change",".variations select",function(){if(c.find('input[name="variation_id"], input.variation_id').val("").change(),c.find(".wc-no-matching-variations").remove(),i){j&&j.abort();var b=!0,d=!1,e={};c.find(".variations select").each(function(){var c=a(this).data("attribute_name")||a(this).attr("name"),f=a(this).val()||"";0===f.length?b=!1:d=!0,e[c]=f}),b?(e.product_id=g,e.custom_data=c.data("custom_data"),c.block({message:null,overlayCSS:{background:"#fff",opacity:.6}}),j=a.ajax({url:wc_cart_fragments_params.wc_ajax_url.toString().replace("%%endpoint%%","get_variation"),type:"POST",data:e,success:function(a){a?c.trigger("found_variation",[a]):(c.trigger("reset_data"),c.find(".single_variation").after('<p class="wc-no-matching-variations woocommerce-info">'+wc_add_to_cart_variation_params.i18n_no_matching_variations_text+"</p>"),c.find(".wc-no-matching-variations").slideDown(200))},complete:function(){c.unblock()}})):c.trigger("reset_data"),d?"hidden"===k.css("visibility")&&k.css("visibility","visible").hide().fadeIn():k.css("visibility","hidden")}else c.trigger("woocommerce_variation_select_change"),c.trigger("check_variations",["",!1]),a(this).blur();a(".product.has-default-attributes > .images").fadeTo(200,1),c.trigger("woocommerce_variation_has_changed")}).on("focusin touchstart",".variations select",function(){("ontouchstart"in b||navigator.maxTouchPoints)&&(a(this).find("option:selected").attr("selected","selected"),i||(c.trigger("woocommerce_variation_select_focusin"),c.trigger("check_variations",[a(this).data("attribute_name")||a(this).attr("name"),!0])))}).on("found_variation",function(b,e){var g=f.find(".product_meta").find(".sku"),h=f.find(".product_weight"),i=f.find(".product_dimensions"),j=n.find(".quantity"),k=!0;e.sku?g.wc_set_content(e.sku):g.wc_reset_content(),e.weight?h.wc_set_content(e.weight):h.wc_reset_content(),e.dimensions?i.wc_set_content(e.dimensions):i.wc_reset_content(),c.wc_variations_image_update(e);var o="";e.variation_is_visible?(o=l({variation:e}),o=o.replace("/*<![CDATA[*/",""),o=o.replace("/*]]>*/",""),d.html(o),c.find('input[name="variation_id"], input.variation_id').val(e.variation_id).change()):(o=m(),o=o.replace("/*<![CDATA[*/",""),o=o.replace("/*]]>*/",""),d.html(o),c.find('input[name="variation_id"], input.variation_id').val("").change()),"yes"===e.is_sold_individually?(j.find("input.qty").val("1").attr("min","1").attr("max",""),j.hide()):(j.find("input.qty").attr("min",e.min_qty).attr("max",e.max_qty),j.show()),e.is_purchasable&&e.is_in_stock&&e.variation_is_visible||(k=!1),a.trim(d.text())?d.slideDown(200).trigger("show_variation",[e,k]):d.show().trigger("show_variation",[e,k])}).on("check_variations",function(c,f,g){if(!i){var j=!0,k=!1,l={},m=a(this),n=m.find(".reset_variations");m.find(".variations select").each(function(){var b=a(this).data("attribute_name")||a(this).attr("name"),c=a(this).val()||"";0===c.length?j=!1:k=!0,f&&b===f?(j=!1,l[b]=""):l[b]=c});var o=e.find_matching_variations(h,l);if(j){var p=o.shift();p?m.trigger("found_variation",[p]):(m.find(".variations select").val(""),g||m.trigger("reset_data"),b.alert(wc_add_to_cart_variation_params.i18n_no_matching_variations_text))}else m.trigger("update_variation_values",[o]),g||m.trigger("reset_data"),f||d.slideUp(200).trigger("hide_variation");k?"hidden"===n.css("visibility")&&n.css("visibility","visible").hide().fadeIn():n.css("visibility","hidden")}}).on("update_variation_values",function(b,d){i||(c.find(".variations select").each(function(b,c){var e,f=a(c),g=a(c).data("show_option_none"),h="no"===g?"":":gt(0)";f.data("attribute_options")||f.data("attribute_options",f.find("option"+h).get()),f.find("option"+h).remove(),f.append(f.data("attribute_options")),f.find("option"+h).removeClass("attached"),f.find("option"+h).removeClass("enabled"),f.find("option"+h).removeAttr("disabled"),e="undefined"!=typeof f.data("attribute_name")?f.data("attribute_name"):f.attr("name");for(var i in d)if("undefined"!=typeof d[i]){var j=d[i].attributes;for(var k in j)if(j.hasOwnProperty(k)){var l=j[k];if(k===e){var m="";d[i].variation_is_active&&(m="enabled"),l?(l=a("<div/>").html(l).text(),l=l.replace(/'/g,"\\'"),l=l.replace(/"/g,'\\"'),f.find('option[value="'+l+'"]').addClass("attached "+m)):f.find("option"+h).addClass("attached "+m)}}}f.find("option"+h+":not(.attached)").remove(),f.find("option"+h+":not(.enabled)").attr("disabled","disabled")}),c.trigger("woocommerce_update_variation_values"))}),c.trigger("wc_variation_form"),c};var e={find_matching_variations:function(a,b){for(var c=[],d=0;d<a.length;d++){var f=a[d];e.variations_match(f.attributes,b)&&c.push(f)}return c},variations_match:function(a,b){var c=!0;for(var e in a)if(a.hasOwnProperty(e)){var f=a[e],g=b[e];f!==d&&g!==d&&0!==f.length&&0!==g.length&&f!==g&&(c=!1)}return c}};a.fn.wc_set_content=function(a){d===this.attr("data-o_content")&&this.attr("data-o_content",this.text()),this.text(a)},a.fn.wc_reset_content=function(){d!==this.attr("data-o_content")&&this.text(this.attr("data-o_content"))},a.fn.wc_set_variation_attr=function(a,b){d===this.attr("data-o_"+a)&&this.attr("data-o_"+a,this.attr(a)?this.attr(a):""),this.attr(a,b)},a.fn.wc_reset_variation_attr=function(a){d!==this.attr("data-o_"+a)&&this.attr(a,this.attr("data-o_"+a))},a.fn.wc_variations_image_update=function(a){var b=this,c=b.closest(".product"),d=c.find("div.images img:eq(0)"),e=c.find("div.images a.zoom:eq(0)");a&&a.image_src&&a.image_src.length>1?(d.wc_set_variation_attr("src",a.image_src),d.wc_set_variation_attr("title",a.image_title),d.wc_set_variation_attr("alt",a.image_alt),d.wc_set_variation_attr("srcset",a.image_srcset),d.wc_set_variation_attr("sizes",a.image_sizes),e.wc_set_variation_attr("href",a.image_link),e.wc_set_variation_attr("title",a.image_caption)):(d.wc_reset_variation_attr("src"),d.wc_reset_variation_attr("title"),d.wc_reset_variation_attr("alt"),d.wc_reset_variation_attr("srcset"),d.wc_reset_variation_attr("sizes"),e.wc_reset_variation_attr("href"),e.wc_reset_variation_attr("title"))},a(function(){"undefined"!=typeof wc_add_to_cart_variation_params&&a(".variations_form").each(function(){a(this).wc_variation_form().find(".variations select:eq(0)").change()})})}(jQuery,window,document);