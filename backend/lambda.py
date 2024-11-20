import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Tasks')

def handler(event, context):
    print(f"Received event: {json.dumps(event)}")
    
    # Determine the HTTP method
    http_method = event.get('httpMethod')
    resource = event.get('resource')
    path_parameters = event.get('pathParameters', {})

    if http_method == 'GET' and resource == '/task':
        task_id = path_parameters.get('taskId')
        if not task_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'taskId is required'})
            }
        
        try:
            response = table.get_item(Key={'taskId': task_id})
            if 'Item' in response:
                return {
                    'statusCode': 200,
                    'body': json.dumps(response['Item']),
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            else:
                return {
                    'statusCode': 404,
                    'body': json.dumps({'error': 'Task not found'})
                }
        except Exception as e:
            print(f"Error encountered: {e}")
            return {
                'statusCode': 500,
                'body': json.dumps({'error': 'Internal server error', 'message': str(e)})
            }
    
    elif http_method == 'POST' and resource == '/task':
        try:
            body = json.loads(event['body'])
            task_id = body['taskId']
            taskName = body['taskName']
            completed = body['completed']
            table.put_item(Item={'taskId': task_id, 'taskName': taskName, 'completed': completed})
            return {
                'statusCode': 201,
                'body': json.dumps({'message': 'Task created successfully'}),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        except Exception as e:
            print(f"Error creating task: {e}")
            return {
                'statusCode': 500,
                'body': json.dumps({'error': 'Failed to create task', 'message': str(e)})
            }

    elif http_method == 'PUT' and 'taskId' in path_parameters:
        task_id = path_parameters['taskId']
        try:
            body = json.loads(event['body'])
            update_expression = "SET"
            expression_attribute_values = {}

            if 'taskName' in body:
                update_expression += " taskName = :taskName,"
                expression_attribute_values[':taskName'] = body['taskName']

            if 'completed' in body:
                update_expression += " completed = :completed,"
                expression_attribute_values[':completed'] = body['completed']

            update_expression = update_expression.rstrip(',')

            table.update_item(
                Key={'taskId': task_id},
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_attribute_values
            )
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Task updated successfully'}),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        except Exception as e:
            print(f"Error updating task: {e}")
            return {
                'statusCode': 500,
                'body': json.dumps({'error': 'Failed to update task', 'message': str(e)})
            }

    elif http_method == 'DELETE' and 'taskId' in path_parameters:
        task_id = path_parameters['taskId']
        try:
            table.delete_item(Key={'taskId': task_id})
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Task deleted successfully'}),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        except Exception as e:
            print(f"Error deleting task: {e}")
            return {
                'statusCode': 500,
                'body': json.dumps({'error': 'Failed to delete task', 'message': str(e)})
            }

    return {
        'statusCode': 400,
        'body': json.dumps({'error': 'Unsupported HTTP method or incorrect endpoint'}),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
