我推荐 Andris Reinman 的 Nodemailer(https: //npmjs.org/package/nodemailer)
        Nodemailer 为大多数流行的邮件服务提供了快捷方式: Gmail、 Hotmail、 iCloud、 Yahoo!, 除此之外还有很多。 如果你的 MSA 没有出现在这个列表上, 或者你需要直接连接一个 SMTP 服务器, 它也支持:


        var mailTransport = nodemailer.createTransport('SMTP', {
            host: 'smtp.meadowlarktravel.com',
            secureConnection: true, // 用 SSL 端口 : 465 
            auth: {
                user: credentials.meadowlarkSmtp.user,
                pass: credentials.meadowlarkSmtp.password,
            }
        });

        发送邮件： mailTransport.sendMail({
            from: '"Meadowlark Travel" <info@meadowlarktravel.com>',
            to: 'joecustomer@gmail.com',
            subject: 'Your Meadowlark Travel Tour',
            text: 'Thank you for booking your trip with Meadowlark Travel.' +
                'We look forward to your visit!',
        }, function(err) {
            if (err) console.error('Unable to send email: ' + error);
        });

        // 发送给多人
        mailTransport.sendMail({
            from: '"Meadowlark Travel" <info@meadowlarktravel.com>',
            to: 'joe@gmail.com, "Jane Customer" <jane@yahoo.com>, ' +
                'fred@hotmail.com',
            subject: 'Your Meadowlark Travel Tour',
            text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
                'We look forward to your visit!',
        }, function(err) {
            if (err) console.error('Unable to send email: ' + error);
        });


        1. SMTP / MSA / MTA 邮件协议

        2. 邮件头： 头部包含与邮件有关的信息， 谁发的、 发给谁、 接收日期、 主题等

        3.用视图发送HTML邮件 HTML Email Boilerplate(http://htmlemailboilerplate.com/)

