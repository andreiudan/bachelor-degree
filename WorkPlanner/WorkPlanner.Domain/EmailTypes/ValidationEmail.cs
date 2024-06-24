using Microsoft.Extensions.Options;
using WorkPlanner.Domain.Configurations;

namespace WorkPlanner.Domain.EmailTypes
{
    public class ValidationEmail : EmailMessage
    {
        private readonly AccountValidationConfiguration config;

        public ValidationEmail(IOptions<AccountValidationConfiguration> config)
        {
            this.config = config.Value ?? throw new ArgumentNullException(nameof(config));

            Recipients = new List<string>();
            Subject = "SprintHive Account Validation";
        }

        public override void SetContent(params string[] content)
        {
            int activationLinkIndex = 0;

            string emailTemplate = @"
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }}
                        .header {{
                            padding: 6px 0;
                            text-align: center;
                            background-color: #006a6a;
                            color: white;
                            border-radius: 12px;
                        }}
                        .content {{
                            padding: 20px;
                            font-size: 16px;
                            line-height: 1.6;
                            color: #333333;
                        }}
                        .footer {{
                            padding: 10px 0;
                            text-align: center;
                            background-color: #f4f4f4;
                            color: #777777;
                            font-size: 12px;
                            border-radius: 12px;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h1>Welcome to SprintHive</h1>
                        </div>
                        <div class='content'>
                            <p>Please validate your account by clicking <a href='{0}'>here</a>.</p>
                            <p>The link will expire after {1} minutes.</p>
                        </div>
                        <div class='footer'>
                            <p>&copy; 2024 SprintHive. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>";

            string activationLink = content[activationLinkIndex];
            Content = string.Format(emailTemplate, activationLink, config.ExpirationTimeInMinutes);
        }
    }
}
