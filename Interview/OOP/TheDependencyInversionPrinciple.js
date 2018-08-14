/**
 * High-level modules should not depend on low-level modules.  Both should depend on abstractions.
 * 高层模块不应该依赖于低层模块，二者都应该依赖于抽象
 * 
 * Abstractions should not depend upon details.  Details should depend upon abstractions
 * 抽象不应该依赖于细节，细节应该依赖于抽象
 * 
 * 确保应用程序或框架的主要组件从非重要的底层组件实现细节解耦出来，这将确保程序的最重要的部分不会因为低层次组件的变化修改而受影响。
 * 高层模块不仅要从第三方类库解耦出来，也需要从原生的低层模块里解耦出来。
 */

/**
 * 何时依赖注入？
 * 依赖注入是控制反转的一个特殊形式，反转的意思一个组件如何获取它的依赖。
 * 不过，依赖倒置原则没有关注组件如何获取依赖，而是只关注高层模块如何从低层模块里解耦出来。
 * 某种意义上说，依赖倒置原则是控制反转的另外一种形式，这里反转的是哪个模块定义接口（从低层里定义，反转到高层里定义）。
 */

$.fn.trackMap = function (options) {
  var defaults = {
    /* defaults */
  };
  options = $.extend({}, defaults, options);

  var mapOptions = {
      center: new google.maps.LatLng(options.latitude, options.longitude),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    map = new google.maps.Map(this[0], mapOptions),
    pos = new google.maps.LatLng(options.latitude, options.longitude);

  var marker = new google.maps.Marker({
    position: pos,
    title: options.title,
    icon: options.icon
  });

  marker.setMap(map);

  options.provider.showMap(
    this[0],
    options.latitude,
    options.longitude,
    options.icon,
    options.title
  );
  options.feed.update(function (latitude, longitude) {
    options.provider.updateMap(latitude, longitude);
  });

  return this;
};

var updater = (function () {
  // private properties

  return {
    update: function (callback) {
      updateMap = callback;
    }
  };
})();

$("#map_canvas").trackMap({
  latitude: 35.044640193770725,
  longitude: -89.98193264007568,
  icon: 'http://bit.ly/zjnGDe',
  title: 'Tracking Number: 12345',
  feed: updater
});

/**
 * 重新设计了trackMap函数以及需要的一个地图提供商接口，
 * 然后将实现的细节挪到了一个单独的googleMapsProvider组件，
 * 该组件可能独立封装成一个单独的JavaScript模块。
 */
trackMap.googleMapsProvider = (function () {
  var marker, map;

  return {
    showMap: function (element, latitude, longitude, icon, title) {
      var mapOptions = {
          center: new google.maps.LatLng(latitude, longitude),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        pos = new google.maps.LatLng(latitude, longitude);

      map = new google.maps.Map(element, mapOptions);

      marker = new google.maps.Marker({
        position: pos,
        title: title,
        icon: icon
      });

      marker.setMap(map);
    },
    updateMap: function (latitude, longitude) {
      marker.setMap(null);
      var newLatLng = new google.maps.LatLng(latitude, longitude);
      marker.position = newLatLng;
      marker.setMap(map);
      map.setCenter(newLatLng);
    }
  };
})();