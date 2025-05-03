# cloud_csv_frontend
 

### 🧪 Let's troubleshoot step-by-step:

---

### ✅ 1. **Check API URL**

Make sure you've **replaced** this line in `script.js`:

```javascript
const response = await fetch(`https://your-api-id.execute-api.region.amazonaws.com/define?term=${term}`);
```

With your **actual deployed API Gateway endpoint**, like:

```javascript
const response = await fetch(`https://abc123xyz.execute-api.ap-south-1.amazonaws.com/define?term=${term}`);
```

> 🔁 Tip: Copy-paste the exact working URL from API Gateway.

---

### ✅ 2. **Manually Test the API**

Try opening your API endpoint in the browser with a test term:

```
https://your-api-id.execute-api.region.amazonaws.com/define?term=EC2
```

If it:

* ✅ Returns JSON like `{"term": "EC2", "definition": "..."}` → API is working
* ❌ Shows error like **403 Forbidden**, **Missing Authentication Token**, or **Internal Server Error** → fix needed in API or Lambda

---

### ✅ 3. **Check API Gateway Integration Settings**

Go to **API Gateway > Your API > Routes**:

* Ensure the route `/define` is setup as a **GET** method
* Check that it is integrated with your **Lambda function**

---

### ✅ 4. **Enable CORS**

If the error is in browser DevTools like `Access-Control-Allow-Origin`, it’s a **CORS issue**.

Go to:

* **API Gateway → Your API → CORS**
* Enable CORS and redeploy the API

Make sure Lambda response includes:

```json
"headers": {
    "Access-Control-Allow-Origin": "*"
}
```

Example updated Python Lambda return:

```python
return {
    "statusCode": 200,
    "headers": {
        "Access-Control-Allow-Origin": "*"
    },
    "body": json.dumps(response['Item'])
}
```

---

### ✅ 5. **Check Lambda Logs (Very Useful)**

Go to **CloudWatch > Logs > Lambda > GetDefinitionFunction**

Look at the most recent logs for:

* Event structure received
* Any `KeyError` or issues fetching from DynamoDB

---

### ✅ 6. **Test Lambda Independently**

Go to Lambda → Test Function:

Example test event:

```json
{
  "queryStringParameters": {
    "term": "EC2"
  }
}
```

Check if it returns proper data.

---

### ✅ 7. **Check IAM Permissions**

Make sure your Lambda function has permission to read from DynamoDB:

Attach this IAM policy:

```json
{
  "Effect": "Allow",
  "Action": "dynamodb:GetItem",
  "Resource": "arn:aws:dynamodb:region:account-id:table/CloudDictionary"
}
```

 

 
