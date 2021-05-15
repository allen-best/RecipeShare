(function($) {

    let requestConfig = {
        method: 'GET',
        url: '/setup'
    };
    $.ajax(requestConfig).then(function(responseMessage) {
        let response = $(responseMessage);
        let popularPost = response[0].data.popularPost;
        let recentPost = response[0].data.recentPost;
        //create popular list
        for (let i = 0; i < popularPost.length; i++) {
            let newItem = setListItem(popularPost[i]);
            $('#popularList').append(newItem);
        }
        //create recent list
        for (let i = 0; i < recentPost.length; i++) {
            let newItem = setListItem(recentPost[i]);
            $('#recentList').append(newItem);
        }
    });

    function setListItem(post) {
        let name = post.name;
        let type = post.type;
        let id = post._id;
        let time = new Date(post.postedDate).toLocaleString('English', { hour12: false });
        let likes = post.likes.length;
        let newItem = $(`<li>${name} &emsp; ${type} &emsp; ${likes} likes &emsp; ${time} &emsp; <a href='/post/${id}'>View</a> </li>`);
        return newItem;
    }

    //search
    $('#searchForm').submit((event) => {
        event.preventDefault();
        if ($('#search_term').val().trim()) {
            $('#errorDiv').hide();
            $('#popularDiv').hide();
            $('#recentDiv').hide();
            $('#resultList').empty();
            let keyword = $('#search_term').val().trim();
            let type = $("input[name='type']:checked").val();
            var searchRequest = {
                method: 'POST',
                url: '/search',
                contentType: 'application/json',
                data: JSON.stringify({
                    keyword: keyword,
                    type: type
                })
            };
            $.ajax(searchRequest).then(function(responseMessage) {
                let response = $(responseMessage);
                let searchPost = response[0].data;
                if (!searchPost || searchPost.length === 0) {
                    $('#noResultWarning').show();
                } else {
                    $('#noResultWarning').hide();
                    for (let i = 0; i < searchPost.length; i++) {
                        let post = searchPost[i];
                        let name = post.name;
                        let type = post.type;
                        let id = post._id;
                        let time = new Date(post.postedDate).toLocaleString('English', { hour12: false });
                        let likes = post.likes.length;
                        let servings = post.servings;
                        let timeNeeded = post.time;
                        let newItem = $(`<li>${name} &emsp; ${type} &emsp; ${likes} likes &emsp; 
                    ${servings}servings &emsp; time needed: ${timeNeeded} &emsp; ${time} &emsp; <a href='/post/${id}'>View</a> </li>`);
                        $('#resultList').append(newItem);
                    }
                }
                $('#resultDiv').show();
                $('#homeLink').show();
            });
        } else {
            $('#errorDiv').show();
        }
    });


})(jQuery);