
const Twit = require('twit');
const config = require("./config");
const t = new Twit(config)




//  search twitter for all tweets containing the word 'Good Morning' 
 const params = {
  q: 'Good Morning',
  count:2
 };

 t.get("search/tweets", params,gotData);

 function gotData(err, data, response) {
  const tweets = data.statuses;
  for (let i = 0; i < tweets.length; i++) {
console.log(tweets[i].text);
  }
  if(err){
    console.log("something went wrong");
  }else{
    console.log("It worked")
  }
 }



 //  tweet 'Good Morning!'
tweetIt();
setInterval(tweetIt, 60000*60*24); // tweet every 24 hours  
function tweetIt(){
const r = Math.floor(Math.random() * 100);   // random number between 0 and 100  
  const tweet ={
    status:  + r +" #Coding GOOD MORNING from node.js"
   }
  
   t.post("status/update", tweet,tweeted);
   function tweeted(err, data, response) {
    console.log(data)
   
   if(err){
    console.log("something went wrong");
  }else{
    console.log("It worked")
  }
  }  
}



// follow back
const stream =t.stream("user");
stream.on("follow", followed);

function followed(eventMsg) {
  const name = eventMsg.source.name;
  const screenName = eventMsg.source.screenName
tweetIt(".@" + screenName + " Thank You for Follow me " + name + " is following you");
}
function tweetIt(txt){
  const tweet ={
    status: txt 
   }
   t.post("status/update", tweet,tweeted);
   function tweeted(err, data, response) {
    console.log(data)
   if(err){
    console.log("something went wrong");
  }else{
    console.log("It worked")
  }
  }  
}



//  Image Uploading 
// Read the image file from disk
const image = fs.readFileSync('/path/to/image.jpg', { encoding: 'image' });

// Upload the image to Twitter
t.post('media/upload', { media_data: image }, function (err, data, response) {
  if (err) {
    console.log('Error uploading image:', err);
    return;
  }

  // Create a new tweet with the uploaded image
  t.post('statuses/update', {
    status: 'Hello world!',
    media_ids: new Array(data.media_id_string)
  }, function (err, data, response) {
    if (err) {
      console.log('Error creating tweet:', err);
      return;
    }
    console.log('Tweet posted successfully!');
  });
});




// uploading video to twitter
// Read the video file from disk
const video = fs.readFileSync('/path/to/video.mp4', { encoding: 'video' });

// Upload the video to Twitter
t.post('media/upload', { media_data: video, media_type: 'video/mp4' }, function (err, data, response) {
  if (err) {
    console.log('Error uploading video:', err);
    return;
  }

  // Create a new tweet with the uploaded video
  t.post('statuses/update', {
    status: 'Check out this video!',
    media_ids: new Array(data.media_id_string)
  }, function (err, data, response) {
    if (err) {
      console.log('Error creating tweet:', err);
      return;
    }
    console.log('Tweet posted successfully!');
  });
});




// upload gif to twitter
// Read the GIF file from disk
const gif = fs.readFileSync('/path/to/animated.gif', { encoding: 'gif' });

// Upload the GIF to Twitter
t.post('media/upload', { media_data: gif, media_type: 'image/gif' }, function (err, data, response) {
  if (err) {
    console.log('Error uploading GIF:', err);
    return;
  }

  // Create a new tweet with the uploaded GIF
  t.post('statuses/update', {
    status: 'Check out this GIF!',
    media_ids: new Array(data.media_id_string)
  }, function (err, data, response) {
    if (err) {
      console.log('Error creating tweet:', err);
      return;
    }
    console.log('Tweet posted successfully!');
  });
});








