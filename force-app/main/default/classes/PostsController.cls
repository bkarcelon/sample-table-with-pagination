public class PostsController {
    @AuraEnabled
    public static List<PostsWrapper> getPosts() {

        List<PostsWrapper> postsList = new List<PostsWrapper>();

        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://jsonplaceholder.typicode.com/posts');
        req.setMethod('GET');

        HttpResponse res = http.send(req);

        System.debug(res);
        if (res.getStatusCode() == 200) {
            postsList = (List<PostsWrapper>) JSON.deserialize(res.getBody(), List<PostsWrapper>.class);
            return postsList;
        }

        return null;
    }
}
