# @unifed/backend-ml

This package is currently used for machine learning related
code.

Unifed currently utilises two forms of machine learning:

1. A spam detection filter.
2. A text toxicity classifier.

The spam detection models are created and trained in this package,
whereas the text toxicity classifier utilises the pre-trained
[`@tensorflow-models/toxicity`](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)
model.

## Spam Detection

The majority of the code in this package is for training a spam
detection model. 

1. Training data located in the `data` directory is converted
   into a common form, using the parsers located in `src/parsers`.

2. The training data is then tokenized, using `src/tokenizer.ts`.

3. A tensor is created using this data with the code in `src/tensor.ts`.

4. The models used in `src/models` are trained with the data.

`src/train.ts` provides a command line utility for training the models,
whereas `src/test-model.ts` provides a command line utility for for
accessing the performance of models.

An API to utilise the models is exposed in `src/index.ts`, which can
be used by other packages.

### Training Data
Training data is located in the `data` directory. The sources for
the training data are as follows:

  - `enron.zip` - [Source](http://nlp.cs.aueb.gr/software_and_datasets/Enron-Spam/index.html)
  - `sms.zip` - [Source](https://archive.ics.uci.edu/ml/datasets/sms+spam+collection)
  - `spam-assasin.zip` - [Source](https://www.kaggle.com/veleon/ham-and-spam-dataset)
  - `testing.zip` - [Source](https://www.kaggle.com/mandygu/lingspam-dataset)

### Models
The models used have been taken from the following sources:

  - `dense` *(trained)* - [Source](https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8)
  - `dense-pooling` *(trained)* - [Source](https://towardsdatascience.com/nlp-detecting-spam-messages-with-tensorflow-part-ii-77826c8f1abf)
  - `twilio-dense` *(trained)* - [Source](https://www.twilio.com/blog/spam-deep-learning-detection-sms-keras-python-twilio)
  - `lstm` *(not trained)* - [Source](https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8)
  - `bi-directional-lstm` *(not trained)* - [Source](https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8)

Some models have not been trained, as we did not have the computing
resources to do so in a reasonable amount of time.

### Artifacts

The `models` directory contains the trained models. All
configuration information is stored within here. These
models take time to train and are checked into the
repository.

The `meta` directory contains statistics about the training
data, used in the report. This directory is not committed,
as it contained hundreds of thousands of lines.

### Development and Evaluation

A detailed report outlining the development and evaluation
of the spam detection filter is available in both the 3rd
and 4th deliverables.
