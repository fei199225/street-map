var counter = 0;
var map;
var markers = [];

//硬编码六个地点
var locations_array = [{
    title: "北京八达岭长城",
    desc: "",
    location: {
        lat: 40.3597596,
        lng: 116.0200204
    },
    id: "ChIJFbdOF22T8DURnEAe0oca7LM",
    pageId: "884381"
}, {
    title: "北京颐和园",
    desc: "",
    location: {
        lat: 39.9999823,
        lng: 116.2754606
    },
    id: "ChIJP4_Ducf4AjQRMqEETHex2UU",
    pageId: "252070"
}, {
    title: "北京天安门广场",
    desc: "",
    location: {
        lat: 39.9054895,
        lng: 116.3976317
    },
    id: "ChIJ2XRD3Jh2YzYRE1lUrcku6io",
    pageId: "21193952"
}, {
    title: "北京故宫博物院",
    desc: "",
    location: {
        lat: 39.9163447,
        lng: 116.3971546
    },
    id: "ChIJq4HNm91S8DURZGAQm-3qQ94",
    pageId: "69123"
}, {
    title: "北京798艺术区",
    desc: "",
    location: {
        lat: 39.984138,
        lng: 116.49609
    },
    id: "ChIJ8VKWmEqq8TURY4vHHRW3J5M",
    pageId: "988326"
},  {
    title: "北京三里屯",
    desc: "",
    location: {
        lat: 39.935886,
        lng: 116.455419
    },
    id: "ChIJpzA2l5Ss8TURhxCE6XdwnFA",
    pageId: "998995"
} ];

function initMap() {
    this.largeInfowindow = new google.maps.InfoWindow();
    // 设置center
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 39.9,
            lng: 116.4
        },
        zoom: 9,
    });

    this.defaultIcon = makeMarkerIcon("0091ff");
    // 选中标记改变颜色
    this.highlightedIcon = makeMarkerIcon("FFFF24");


    addMarkers(appViewModel.locations());

    //搜索列表选择标记
    appViewModel.locations.subscribe(function() {
        hideMarkers(markers);
        markers = [];
        addMarkers(appViewModel.locations());

    });

    appViewModel.clickedItem.subscribe(function() {
        var marker = markers[appViewModel.clickedItem()];
        getPlacesDetails(marker, largeInfowindow);
        marker.setIcon(highlightedIcon);

    });

}

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" + markerColor +
        "|40|_|%E2%80%A2",
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

// 遍历列表并隐藏
function hideMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function addMarkers(locations) {
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var id = locations[i].id;
        // 创建每个位置的标记并放入数组中
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            id: id,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            map: map,
        });
        markers.push(marker);
        //创建onclick事件
        marker.addListener("click", function() {
            this.setIcon(highlightedIcon);
            getPlacesDetails(this, largeInfowindow);
        });
        // 监听鼠标
        marker.addListener("mouseover", function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener("mouseout", function() {
            this.setIcon(defaultIcon);
        });
    }
}

function getPlacesDetails(marker, infowindow) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: marker.id
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            infowindow.marker = marker;
            var innerHTML = "<div>";
            if (place.name) {
                innerHTML += "<strong>" + place.name + "</strong>";
            }
            if (place.photos) {
                innerHTML += "<br><br><img src='" + place.photos[0].getUrl({
                    maxHeight: 100,
                    maxWidth: 200
                }) + "'>";
            }
            innerHTML += "</div>";
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);
            // 窗口关闭时清除标记
            infowindow.addListener("closeclick", function() {
                marker.setIcon(defaultIcon);
                infowindow.marker = null;
            });
        } else {
            alert(status);
        }
    });
}


var appViewModel = {
    toggleMenu: function() {
        $("#wrapper").toggleClass("toggled");
    },

    locations: ko.observableArray([{
        title: "北京八达岭长城",
        desc: "",
        location: {
            lat: 40.3597596,
            lng: 116.0200204
        },
        id: "ChIJFbdOF22T8DURnEAe0oca7LM",
        pageId: "884381"
    }, {
        title: "北京颐和园",
        desc: "",
        location: {
            lat: 39.9999823,
            lng: 116.2754606
        },
        id: "ChIJP4_Ducf4AjQRMqEETHex2UU",
        pageId: "252070"
    }, {
        title: "北京天安门广场",
        desc: "",
        location: {
            lat: 39.9054895,
            lng: 116.3976317
        },
        id: "ChIJ2XRD3Jh2YzYRE1lUrcku6io",
        pageId: "21193952"
    }, {
        title: "北京故宫博物院",
        desc: "",
        location: {
            lat: 39.9163447,
            lng: 116.3971546
        },
        id: "ChIJq4HNm91S8DURZGAQm-3qQ94",
        pageId: "69123"
    }, {
        title: "北京798艺术区",
        desc: "",
        location: {
            lat: 39.984138,
            lng: 116.49609
        },
        id: "ChIJ8VKWmEqq8TURY4vHHRW3J5M",
        pageId: "988326"
    },  {
        title: "北京三里屯",
        desc: "",
        location: {
            lat: 39.935886,
            lng: 116.455419
        },
        id: "ChIJpzA2l5Ss8TURhxCE6XdwnFA",
        pageId: "998995"
    }

    ]),
    query: ko.observable(""),

    //搜索
    search: function(value) {
        appViewModel.locations.removeAll();
        for (var i = 0; i < locations_array.length; i++) {
            if (locations_array[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                appViewModel.locations.push(locations_array[i]);
            }
        }
    },
    clickedItem: ko.observable(""),
    itemClicked: function(index) {
        appViewModel.clickedItem(index);
    },
    mapsError: function() {
        alert("Unable to load maps");
    }

};

appViewModel.query.subscribe(appViewModel.search);
ko.applyBindings(appViewModel);

//ajax 请求
locations_array.forEach(getWikiData);

//维基百科API（使用pageid）
function getWikiData(location) {
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=" + location.pageId,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function(data, textStatus, jqXHR) {
            counter++;
            var pages = data.query.pages;
            var extract, shortText;
            $.each(pages, function(i, val) {
                shortText = jQuery.trim(val.extract).substring(0, 75).split(" ").slice(0, -1).join(" ") + "...";
                location.desc = shortText;
            });
            if (counter >= 6) {
                appViewModel.locations.removeAll();
                for (var i = 0; i < locations_array.length; i++) {
                    appViewModel.locations.push(locations_array[i]);
                }
                counter = 0;
            }
        },
        timeout: 3000,
        error: function(x, t, m) {
        if(t==="timeout") {
            // 错误处理
            alert("Details cannot be loaded!");
        }
    }
    });
}

//菜单显示隐藏控制
function menu_control(){
    state = document.getElementById("sidebar-wrapper");
    wrapper = document.getElementById("wrapper");
    if(state.style.display == "block"){
        state.style.display = "none";
        wrapper.style.paddingLeft = "40px";
    }else{
        state.style.display = "block";
        wrapper.style.paddingLeft = "250px";
    }

}