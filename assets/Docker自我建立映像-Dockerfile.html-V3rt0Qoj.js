import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e,o as i}from"./app-B8sEJCZi.js";const l={};function p(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="docker自我建立映像-dockerfile" tabindex="-1"><a class="header-anchor" href="#docker自我建立映像-dockerfile"><span>Docker自我建立映像-Dockerfile</span></a></h1><p>大多數人在開發的時候，會想要把某個軟體跟某個軟體合在一起，或這是想要建立一個跟實體環境一樣的軟體套件環境，例如基本的伺服器架構LAMP(Linux-Apache-MySQL-Phpmyadmin)，這時候你就會發現Docker上面的這些套件<strong>都是獨立的</strong>，你要建立4個容器並且將他們用在同個網路上還會發現有些根本難以用這種方式開發，例如PHP跟Apache具有高度的耦合性，這樣會讓開發這在這部分變得不好開發，雖然PHP有做跟Apache合一的映像，但有時候我們還是會需要做些設定來方便開發，例如我要設定共用的公鑰，我就要去apache設定檔設定，這時候就可以利用Dockerfile來建立你自己的映像，讓他變成你好用的映像來做掛載，也不用用產出映像的方式去做處理，只要你的環境是公用的軟體就可以，我來舉個例子：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 使用官方鏡像</span></span>
<span class="line"><span>FROM php:8.2-apache</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 更新包列表并安装PHP模組</span></span>
<span class="line"><span>RUN apt-get update &amp;&amp; apt-get install -y \\</span></span>
<span class="line"><span>    libzip-dev \\</span></span>
<span class="line"><span>    libpng-dev \\</span></span>
<span class="line"><span>    libcurl4-openssl-dev \\</span></span>
<span class="line"><span>    libxml2-dev \\</span></span>
<span class="line"><span>    libssl-dev \\</span></span>
<span class="line"><span>    libonig-dev \\</span></span>
<span class="line"><span>    unzip \\</span></span>
<span class="line"><span>    git \\</span></span>
<span class="line"><span>    curl \\</span></span>
<span class="line"><span>    pkg-config \\</span></span>
<span class="line"><span>    &amp;&amp; apt-get clean</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#更新包列表並安裝必要擴展</span></span>
<span class="line"><span>RUN docker-php-ext-install zip mysqli pdo pdo_mysql gd mbstring xml intl</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 開啟 Apache 的 mod_rewrite</span></span>
<span class="line"><span>RUN a2enmod rewrite</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RUN a2enmod headers</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 關閉錯誤顯示，開啟errorlog</span></span>
<span class="line"><span>RUN echo &quot;display_errors=Off&quot; &gt;&gt; /usr/local/etc/php/conf.d/docker-php.ini \\</span></span>
<span class="line"><span>    &amp;&amp; echo &quot;log_errors=On&quot; &gt;&gt; /usr/local/etc/php/conf.d/docker-php.ini \\</span></span>
<span class="line"><span>    &amp;&amp; echo &quot;error_log=/var/log/apache2/error.log&quot; &gt;&gt; /usr/local/etc/php/conf.d/docker-php.ini</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 安装 Composer</span></span>
<span class="line"><span>RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 設定默認工作目錄</span></span>
<span class="line"><span>WORKDIR /var/www/html</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 添加JWT環境變量到PHP裡面</span></span>
<span class="line"><span>RUN echo &#39;SetEnv JWT_SECRET_KEY ******&#39; &gt;&gt; /etc/apache2/sites-available/000-default.conf &amp;&amp; \\</span></span>
<span class="line"><span>    echo &#39;SetEnv KEYCalName sha256&#39; &gt;&gt; /etc/apache2/sites-available/000-default.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 暴露端口</span></span>
<span class="line"><span>EXPOSE 80</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>這個就是實際上的Dockerfile，你會發現這個Dockerfile做了很多的前置作業，包含了<strong>PHP其他模組的安裝、Composer的安裝、設定 JWT的公鑰密碼變數跟設定errorlog</strong>，這些都是你只使用php:8.2-apache單一映像沒辦法先做到的事，他會先幫你做好，簡單來說，<strong>Dockerfile就是在已有的映像基礎上，先做好客製化的前置作業後再另外衍生出的新建置映像</strong>，可以方便之後的容器開發，就不需要再匯出匯入映像，這就會需要用到之前說道的<strong>Docker buildx</strong>的套件來幫忙建置，一樣，Linux還是有可能需要安裝，Windows跟Mac都已經直接建置好，不用安裝。</p><h2 id="dockerfile的應用場景" tabindex="-1"><a class="header-anchor" href="#dockerfile的應用場景"><span>Dockerfile的應用場景</span></a></h2><p>Dockerfile的應用場景主要用在以下地方：</p><ul><li>CI/CD測試環境建立</li><li>開發環境建立</li><li>CI/CD部屬(如果是用Docker做部屬的話)</li></ul><p>而有時候Dockerfile會跟docker-compse一起使用，用docker-compose可以同時建立所需的映像，還可以順便幫你把容器設定好並建立起來，全程的自動化，會變得很方便。</p>`,8)]))}const o=n(l,[["render",p]]),t=JSON.parse('{"path":"/%E4%BD%9C%E6%A5%AD%E7%B3%BB%E7%B5%B1%E7%9B%B8%E9%97%9C/Docker/Docker%E8%87%AA%E6%88%91%E5%BB%BA%E7%AB%8B%E6%98%A0%E5%83%8F-Dockerfile.html","title":"Docker自我建立映像-Dockerfile","lang":"zh-TW","frontmatter":{"title":"Docker自我建立映像-Dockerfile","description":"DockerFile 的使用","comment":true,"article":true,"date":"2025-01-20T00:00:00.000Z","timeline":true,"sticky":0,"star":true,"isOriginal":false,"category":["作業系統相關","Docker"],"tag":["Docker"]},"headers":[{"level":2,"title":"Dockerfile的應用場景","slug":"dockerfile的應用場景","link":"#dockerfile的應用場景","children":[]}],"git":{"createdTime":1755223787000,"updatedTime":1755223787000,"contributors":[{"name":"Chuan Ling","username":"Chuan Ling","email":"ben831116@gmail.com","commits":1,"url":"https://github.com/Chuan Ling"}]},"readingTime":{"minutes":2.62,"words":786},"filePathRelative":"作業系統相關/Docker/Docker自我建立映像-Dockerfile.md","localizedDate":"2025年1月20日","excerpt":"\\n<p>大多數人在開發的時候，會想要把某個軟體跟某個軟體合在一起，或這是想要建立一個跟實體環境一樣的軟體套件環境，例如基本的伺服器架構LAMP(Linux-Apache-MySQL-Phpmyadmin)，這時候你就會發現Docker上面的這些套件<strong>都是獨立的</strong>，你要建立4個容器並且將他們用在同個網路上還會發現有些根本難以用這種方式開發，例如PHP跟Apache具有高度的耦合性，這樣會讓開發這在這部分變得不好開發，雖然PHP有做跟Apache合一的映像，但有時候我們還是會需要做些設定來方便開發，例如我要設定共用的公鑰，我就要去apache設定檔設定，這時候就可以利用Dockerfile來建立你自己的映像，讓他變成你好用的映像來做掛載，也不用用產出映像的方式去做處理，只要你的環境是公用的軟體就可以，我來舉個例子：</p>"}');export{o as comp,t as data};
