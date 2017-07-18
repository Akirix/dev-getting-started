-----------------------------------------------------------------
# ELK Stack Configuration _draft_
-----------------------------------------------------------------
## Contents
  - [Getting Set Up](#getting-set-up)
-----------------------------------------------------------------


### Getting Set Up
    _General Ideas:_
> If you don't have a elasticsearch, kibana, or logstash previously installed:
```
    brew install elasticsearch; brew install logstash; brew install kibana; 
```
> If you do have elasticsearch, kibana, or logstash -updating
```
   brew upgrade elasticsearch; brew upgrade logstash; brew upgrade kibana;
```
## NOTE:
- ELASTICSEARCH, we need 1.5.0 for our AML API functionality, but the newer version of logstash and kibana require a more recent version
> Caveat: 
- Use one while the other is off, vise-versa
Brew will install / upgrade to the latest but you still may need to use the other
```
    mkdir ~/.local/bin; 
    cd /tmp/; 
    curl -O https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.5.0.zip; 
    unzip elasticsearch-1.5.0.zip -d ~/.local/bin;
    echo "alias devElastic='/Users/$(whoami)/.local/bin/elasticsearch-1.5.0/bin/elasticsearch'" >> ~/.zshrc;
    source ~/.zshrc;
```
> To run your elasticsearch for the platform use 'devElastic' to start it, to run elasticsearch for elk stack use brew services to start
## NOTE: (Logstash)
- Setting up logstash by using a generic conf:
```
    # INPUT SETTINGS
    input {
        tcp {
            port => 28777
            type => "json"
            codec => "json"
        }
    }
    #
    # FILTER SETTINGS
    #
    # OUTPUT SETTINGS
    output {
        elasticsearch {
            hosts => ["127.0.0.1:9200"]
            sniffing => true
            ssl_certificate_verification => false
            index => "development_%{+YYYY.MM.dd}"
        }
    }
    #
```
```
    mkdir ~/.local/etc/;
    touch ~/.local/etc/winstonlogs.conf;
    // to start logstash
    // first verify conf
    logstash -t -f ~/.local/etc/winstonlogs.conf;
    // then if test passes run:
    logstash -f ~/.local/etc/winstonlogs.conf;
```
